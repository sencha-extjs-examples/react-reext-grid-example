import { Ext_define } from "@gusmano/reext";

Ext_define("ReExtExample.model.Sale", {
    extend: "Ext.data.Model",

    fields: [
        { name: "id", type: "int" },
        { name: "company", type: "string" },
        { name: "country", type: "string" },
        { name: "person", type: "string" },
        { name: "date", type: "date", dateFormat: "c" },
        { name: "value", type: "float", allowNull: true },
        { name: "quantity", type: "float", allowNull: true },
        {
            name: "year",
            calculate: function (data) {
                return parseInt(Ext.Date.format(data.date, "Y"), 10);
            },
        },
        {
            name: "month",
            calculate: function (data) {
                return parseInt(Ext.Date.format(data.date, "m"), 10) - 1;
            },
        },
    ],
});
