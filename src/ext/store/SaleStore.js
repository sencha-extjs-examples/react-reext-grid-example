import { Ext_define } from "@gusmano/reext";

import "../model/Sale";
/** Simulated request for employee data */
import "../sim/SaleData";

Ext_define("ReExtExample.store.SaleStore", {
    extend: "Ext.data.Store",
    alias: "store.saleStoreExample",

    model: "ReExtExample.model.Sale",
    autoLoad: true,
    proxy: {
        type: "ajax",
        url: "/sencha-examples/api/salesdata",
        reader: {
            type: "json",
        },
    },
});
