import { Ext_define } from "@gusmano/reext";

import { companies, persons, countries } from "./mockData";

Ext_define("ReExtExample.data.SaleData", {}, function () {
    const statics = {
        rand: 37,
        getRandomItem(data) {
            var rand = statics.rand,
                k = rand % data.length;

            rand = rand * 1664525 + 1013904223;
            rand &= 0x7fffffff;
            statics.rand = rand;

            return data[k];
        },

        getRandomDate: function (start, end) {
            return Ext.Date.clearTime(
                new Date(
                    start.getTime() +
                        Math.random() * (end.getTime() - start.getTime())
                )
            );
        },

        getRandomNumber: function (multiply) {
            return Math.random() * (multiply || 1000) + 1;
        },

        getRandomCompany: function () {
            return statics.getRandomItem(companies);
        },

        getRandomCountry: function () {
            return statics.getRandomItem(countries);
        },

        getRandomPerson: function () {
            return statics.getRandomItem(persons);
        },
    };

    function createResponseItems(items) {
        const data = [];

        if (!items) {
            items = 500;
        }

        for (let i = 0; i < items; i++) {
            data.push({
                id: i,
                company: statics.getRandomCompany(),
                country: statics.getRandomCountry(),
                person: statics.getRandomPerson(),
                date: statics.getRandomDate(
                    new Date(2020, 0, 1),
                    new Date(2024, 4, 30)
                ),
                value: Ext.Number.toFixed(statics.getRandomNumber(), 2),
                quantity: Math.floor(statics.getRandomNumber(30)),
            });
        }

        return data;
    }

    Ext.ux.ajax.SimManager.register({
        "/sencha-examples/api/salesdata": {
            type: "json",
            data: createResponseItems(),
        },
    });
});
