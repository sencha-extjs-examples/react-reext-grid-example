import { Ext_define } from "@gusmano/reext";

import "../model/Employee";

/** Simulated request for employee data */
import "../sim/EmployeeData";

Ext_define("ReExtExample.store.EmployeeStore", {
    extend: "Ext.data.Store",
    alias: "store.employeeStoreExample",
    autoLoad: true,
    model: "ReExtExample.model.Employee",
    proxy: {
        type: "ajax",
        url: "/sencha-examples/api/employee",
        reader: {
            type: "json",
        },
    },
});
