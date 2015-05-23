/* This program is free software: you can redistribute it and/or
   modify it under the terms of the GNU Lesser General Public License
   as published by the Free Software Foundation, either version 3 of
   the License, or (at your option) any later version.
   
   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.
   
   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>. 
*/

otp.namespace("otp.locale");

/**
  * @class
  */
otp.locale.English = {

    config :
    {
        //Name of a language written in a language itself (Used in Frontend to
        //choose a language)
        name: 'English',
        //FALSE-imperial units are used
        //TRUE-Metric units are used
        metric : false, 
        //Name of localization file (*.po file) in src/client/i18n
        locale_short : "en",
        //Name of datepicker localization in
        //src/client/js/lib/jquery-ui/i18n (usually
        //same as locale_short)
        //this is index in $.datepicker.regional array
        //If file for your language doesn't exist download it from here
        //https://github.com/jquery/jquery-ui/tree/1-9-stable/ui/i18n
        //into src/client/js/lib/jquery-ui/i18n
        //and add it in index.html after other localizations
        //It will be used automatically when UI is switched to this locale
        datepicker_locale_short: "" //Doesn't use localization

    },

    /**
     * Info Widgets: a list of the non-module-specific "information widgets"
     * that can be accessed from the top bar of the client display. Expressed as
     * an array of objects, where each object has the following fields:
     * - content: <string> the HTML content of the widget
     * - [title]: <string> the title of the widget
     * - [cssClass]: <string> the name of a CSS class to apply to the widget.
     * If not specified, the default styling is used.
     */
    infoWidgets : [
            {
                title: 'About this site',
                content: ['<h2>Code for Philly OpenTripPlanner</h2><p>This is an instance of ',
                          '<a href="https://github.com/opentripplanner/OpenTripPlanner">OpenTripPlanner</a>',
                          ' deployed and maintained by volunteers at ',
                          '<a href="https://codeforphilly.org">Code for Philly</a>. ',
                          'Our project page is <a href="https://codeforphilly.org/projects/otp">here</a>.</p>',
                          '<p>Use of this website is at your own risk. We do not make any warranty as to the results ',
                          'that may be obtained from use of this website or as to the accuracy, reliability or ',
                          'contents of any information provided through this website.</p>',
                          '<h3>Indego bike rental information:</h3>',
                          '<p>For information on Indego bike rental in Philadelphia and to sign up,',
                          'Visit the <a href="http://www.rideindego.com/">Indego web site</a>.</p>',
                          '<p>Bike rental directions use the B-cycle API. ',
                          // Disclaimer required for use of the B-cycle API.
                          'Powered by B‐cycle. To sign up, go to ',
                          '<a href="www.bcycle.com">www.bcycle.com</a>. This is a third-party application ',
                          'not affiliated in any way with B-cycle. This is not a B-cycle site or application. ',
                          '</p>'
                          ].join(''),
                //cssClass: 'otp-contactWidget',
            },
            {
                title: 'Contact',
                content: '<p>Comments? <a href="https://codeforphilly.org/contact">Contact us</a>.</p>'
            },
    ],


    time:
    {
        format         : "MMM Do YYYY, h:mma", //moment.js
        date_format    : "MM/DD/YYYY", //momentjs must be same as date_picker format which is by default: mm/dd/yy
        time_format    : "h:mma", //momentjs
        time_format_picker : "hh:mmtt", //http://trentrichardson.com/examples/timepicker/#tp-formatting
    },

    CLASS_NAME : "otp.locale.English"
};

