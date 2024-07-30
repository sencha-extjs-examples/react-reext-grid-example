import i18next from "i18next";

var classname = "ReExtExample.view.pivot.ExporterController";

if (!Ext?.ClassManager.isCreated(classname)) {
    Ext.define(classname, {
        extend: "Ext.app.ViewController",
        alias: "controller.pivotGridController",

        // requires: [
        //     'Ext.exporter.text.CSV',
        //     'Ext.exporter.text.TSV',
        //     'Ext.exporter.text.Html',
        //     'Ext.exporter.excel.Xml',
        //     'Ext.exporter.excel.Xlsx',
        //     'Ext.exporter.excel.PivotXlsx'
        // ],

        showConfigurator: function () {
            this.getView().showConfigurator();
        },

        yearLabelRenderer: function (value) {
            return "Year " + value;
        },

        monthLabelRenderer: function (value) {
            return Ext.Date.monthNames[value];
        },

        coloredRenderer: function (v, record, dataIndex, cell, column) {
            cell.setStyle(
                Ext.String.format("color: {0};", v > 500 ? "green" : "red")
            );

            return Ext.util.Format.number(v, "0,000.00");
        },

        onPivotGroupExpand: function (matrix, type, group) {
            Ext.log(
                (group
                    ? 'Group "' + group.name + '" expanded on '
                    : "All groups expanded on ") + type
            );
        },

        onPivotGroupCollapse: function (matrix, type, group) {
            Ext.log(
                (group
                    ? 'Group "' + group.name + '" collapsed on '
                    : "All groups expanded on ") + type
            );
        },

        exportDocument: function (menuitem) {
            var pivotgrid = this.getView(),
                cfg = menuitem.cfg;

            if (cfg.matrix === true) {
                cfg.matrix = pivotgrid.getMatrix();
            }

            if (!cfg.title) {
                cfg.title = "Pivot grid export demo";
            }

            pivotgrid.saveDocumentAs(menuitem.cfg).then(null, this.onError);
        },

        onError: function (error) {
            Ext.Msg.alert(
                "Error",
                typeof error === "string" ? error : "Unknown error"
            );
        },

        onBeforeDocumentSave: function (view) {
            view.mask({
                xtype: "loadmask",
                //message: 'Document is prepared for export. Please wait ...'
            });
        },

        onDocumentSave: function (view) {
            view.unmask();
        },

        getPerformance: function (records, dataIndex) {
            var ret = [],
                len = records.length,
                i;

            for (i = 0; i < len; i++) {
                ret.push(records[i].get(dataIndex));
            }

            return ret.length ? ret : null;
        },

        onPivotItemTap: function (params, e, eOpts) {
            if (e.getTarget().className === "pivot-grid-group-title") {
                Ext.Msg.alert("Sencha ReExt", i18next.t("TRY_EXTJS"));
                return false;
            }
        },
    });
}
