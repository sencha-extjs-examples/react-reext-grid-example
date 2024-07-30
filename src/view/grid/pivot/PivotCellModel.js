import { Ext_define } from "@gusmano/reext";

Ext_define("SenchaExample.view.grid.pivot.PivotCellModel", {
    extend: "Ext.app.ViewModel",
    alias: "viewmodel.pivot-cell-model",

    formulas: {
        cellStyle: function (get) {
            var isGrandTotal =
                    get("record.isRowGrandTotal") ||
                    get("column.isColGrandTotal"),
                isHeader =
                    get("record.isRowGroupHeader") ||
                    get("column.isColGroupTotal"),
                isFooter = get("record.isRowGroupTotal"),
                value = get("value"),
                cls;

            if (isGrandTotal) {
                cls = "pivotCellGrandTotal";
            } else if (isFooter) {
                cls = "pivotCellGroupFooter";
            } else if (isHeader) {
                cls = "pivotCellGroupHeader";
            } else {
                cls = get("column.topAxisColumn")
                    ? value >= 500
                        ? "pivotCellAbove500"
                        : "pivotCellUnder500"
                    : "";
            }

            return cls;
        },
    },
});
