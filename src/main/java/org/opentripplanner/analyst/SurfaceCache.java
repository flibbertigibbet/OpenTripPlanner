package org.opentripplanner.analyst;


import com.beust.jcommander.internal.Lists;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;
import net.sf.ehcache.config.*;
import org.opentripplanner.api.model.TimeSurfaceShort;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.util.List;


/**
 * Caches travel time surfaces, which are derived from shortest path trees.
 */
public class SurfaceCache {

    private final Ehcache cache;
    private static final String CACHE_NAME = "time-surface";
    private static final Logger LOG = LoggerFactory.getLogger(SurfaceCache.class);

    private static final int MAX_CACHE_MEMORY_GB = 6;
    private static final int MAX_CACHE_LOCAL_DISK_GB = 20;

    public SurfaceCache(File cacheDirectory) {

        String diskCacheDir = null;

        if (cacheDirectory != null) {
            String surfaceCacheDirectory = cacheDirectory.getAbsolutePath() + "/" + CACHE_NAME;
            File directory = new File(surfaceCacheDirectory);
            diskCacheDir = directory.getAbsolutePath();
            if (!directory.isDirectory()) {
                if (!directory.mkdirs()) {
                    LOG.error("Failed to create cache directory for TimeSurfaces");
                    diskCacheDir = null;
                }
            }
        }

        Configuration cacheManagerConfig = new Configuration();

        cacheManagerConfig.sizeOfPolicy(new SizeOfPolicyConfiguration().maxDepth(900000000)
                .maxDepthExceededBehavior(SizeOfPolicyConfiguration.MaxDepthExceededBehavior.CONTINUE));

        CacheConfiguration cacheConfig = new CacheConfiguration()
                .name(CACHE_NAME)
                .maxBytesLocalHeap(MAX_CACHE_MEMORY_GB, MemoryUnit.GIGABYTES);

        if (diskCacheDir != null) {
            // cache to disk
            cacheManagerConfig.diskStore(new DiskStoreConfiguration().path(diskCacheDir));
            cacheConfig.persistence(new PersistenceConfiguration().strategy(PersistenceConfiguration.Strategy.LOCALTEMPSWAP));
            cacheConfig.maxBytesLocalDisk(MAX_CACHE_LOCAL_DISK_GB, MemoryUnit.GIGABYTES);
        } else {
            // keep cache in-memory
            cacheConfig.persistence(new PersistenceConfiguration().strategy(PersistenceConfiguration.Strategy.NONE));
        }

        cacheManagerConfig.addCache(cacheConfig);
        CacheManager cacheManager = new CacheManager(cacheManagerConfig);
        cache = cacheManager.getEhcache(CACHE_NAME);
    }

    public int add(TimeSurface surface) {
    	this.cache.put(new Element(surface.id, surface));
    	return surface.id;
    }

    public TimeSurface get(Object id) {
        Element found = this.cache.get(id);
        if (found != null) {
            return (TimeSurface)found.getObjectValue();
        }
        return null;
    }

    public List<TimeSurfaceShort> list() {
        List keys = this.cache.getKeys();
        List<TimeSurfaceShort> out = Lists.newArrayList();
        for (Object key : keys) {
            TimeSurface surface = this.get(key);
            out.add(new TimeSurfaceShort(surface));
        }
        return out;
    }

}
