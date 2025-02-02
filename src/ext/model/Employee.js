import { Ext_define } from "@gusmano/reext";

Ext_define("ReExtExample.model.Employee", {
    extend: "Ext.data.Model",
    idField: "employeeNo",

    fields: [
        {
            name: "employeeNo",
            type: "integer",
        },
        {
            name: "rating",
        },
        {
            name: "averageRating",
            calculate: function (data) {
                var average,
                    i,
                    ratings = data.rating || [],
                    count = ratings.length;

                for (i = 0, average = 0; i < count; i++) {
                    average += data.rating[i];
                }

                return average / ratings.length;
            },
        },
        {
            name: "salary",
            type: "number",
        },
        {
            name: "age",
            type: "number",
        },
        {
            name: "forename",
        },
        {
            name: "surname",
        },
        {
            name: "countryCode",
        },
        {
            name: "countryName",
        },
        {
            name: "color",
        },
        {
            name: "fullName",
            calculate: function (data) {
                var first = data.forename,
                    last = data.surname;

                return first || last ? first + " " + last : "";
            },
        },
        {
            name: "email",
        },
        {
            name: "department",
        },
        {
            name: "dob",
            type: "date",
            dateFormat: "Ymd",
        },
        {
            name: "joinDate",
            type: "date",
            dateFormat: "Ymd",
        },
        {
            name: "noticePeriod",
        },
        {
            name: "sickDays",
            type: "integer",
            summary: "average",
        },
        {
            name: "holidayDays",
            type: "integer",
            summary: "average",
        },
        {
            name: "holidayAllowance",
            type: "integer",
            summary: "average",
        },
        {
            name: "avatar",
        },
        {
            name: "ratingLastYear",
            type: "integer",
        },
        {
            name: "ratingThisYear",
            type: "integer",
        },
        {
            name: "verified",
            type: "boolean",
        },
    ],
});
