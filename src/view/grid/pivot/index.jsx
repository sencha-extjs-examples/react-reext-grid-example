import React from "react";
import ReExt from "@gusmano/reext";
import i18next from "i18next";

import "./PivotController";
import "./PivotCellModel";

export function GridPivot() {
    return (
        <ReExt
            xtype="pivotgrid"
            style={{ flex: 1 }}
            config={{
                width: "100vw",
                height: "calc(100vh - 96px)",
                controller: "pivotGridController",

                selModel: {
                    type: "cellmodel",
                },
                selectable: {
                    cells: true,
                },

                enableLocking: true,
                bufferedRenderer: true,
                leadingBufferZone: 100,
                trailingBufferZone: 100,
                startRowGroupsCollapsed: true,
                startColGroupsCollapsed: true,

                plugins: {
                    pivotdrilldown: true,
                    // pivotrangeeditor: true,
                    pivotexporter: true,
                    pivotconfigurator: true,
                },

                listeners: {
                    documentsave: "onDocumentSave",
                    beforedocumentsave: "onBeforeDocumentSave",
                    pivotgroupexpand: "onPivotGroupExpand",
                    pivotgroupcollapse: "onPivotGroupCollapse",
                    pivotitemtap: "onPivotItemTap",
                },

                itemConfig: {
                    viewModel: {
                        // use a default viewModel when using bind templates
                        type: "default",
                        // or a user defined viewModel when using bind formulas
                        // type: 'pivot-row-model'
                    },
                    bind: {
                        // bind template usage
                        userCls:
                            '{record.isRowGrandTotal ? "pivotRowGrandTotal" : (record.isRowGroupHeader ? "pivotRowHeader" : (record.isRowGroupTotal ? "pivotRowTotal" : ""))}',
                        // or bind formula
                        // userCls: '{rowStyle}'
                    },
                },

                topAxisCellConfig: {
                    viewModel: {
                        type: "pivot-cell-model",
                    },
                },

                matrix: {
                    store: {
                        type: "saleStoreExample",
                    },
                    type: "local",
                    calculateAsExcel: true,
                    rowSubTotalsPosition: "last",
                    aggregate: [
                        {
                            dataIndex: "value",
                            header: "Total",
                            aggregator: "sum",
                            width: 120,
                            exportStyle: [
                                {
                                    // no type key is defined here which means that this is the
                                    // default style that will be used by all exporters
                                    format: "Currency",
                                    alignment: {
                                        horizontal: "Right",
                                    },
                                },
                                {
                                    // the type key means that this style will only be used by the
                                    // html exporter and for all others the default one, defined
                                    // above, will be used
                                    type: "html",
                                    format: "Currency",
                                    alignment: {
                                        horizontal: "Right",
                                    },
                                    font: {
                                        italic: true,
                                        bold: true,
                                    },
                                },
                            ],
                        } /*{
            dataIndex: 'value',
            header: 'Performance',
            aggregator: 'getPerformance',
           // ignoreExport: true,
            width: 110,
            exportStyle: null,
            // Define here column specific configs for all columns
            // generated for this aggregate dimension
            column: {
                cell: {
                    xtype: 'widgetcell',
                    forceWidth: true,
                    widget: {
                        xtype: 'sparklineline'
                    }
                }
            }
        }function(records, dataIndex) {
        var ret = [],
            len = records.length,
            i;

        for (i = 0; i < len; i++) {
            ret.push(records[i].get(dataIndex));
        }

        return ret.length ? ret : null;
    }*/,
                    ],

                    // Configure the left axis dimensions that will be used to generate
                    // the grid rows
                    leftAxis: [
                        {
                            dataIndex: "person",
                            header: i18next.t("PERSON"),
                            // You can also define here a `cellConfig` for binding
                            // This is used only when `viewLayoutType` is `outline`
                            cellConfig: {
                                viewModel: {
                                    type: "default",
                                },
                                bind: {
                                    userCls:
                                        '{record.isRowGroupHeader:pick("","pivotCellGroupHeader")}',
                                },
                            },
                        },
                        {
                            dataIndex: "company",
                            header: i18next.t("COMPANY"),
                            width: 130,
                            sortable: false,
                        },
                        {
                            dataIndex: "country",
                            header: i18next.t("COUNTRY"),
                            width: 130,
                            labelRenderer: function (countryName) {
                                return `<span class="pivot-grid-group-title">${countryName}</span>`;
                            },
                        },
                    ],

                    /**
                     * Configure the top axis dimensions that will be used to generate
                     * the columns.
                     *
                     * When columns are generated the aggregate dimensions are also used.
                     * If multiple aggregation dimensions are defined then each top axis
                     * result will have in the end a column header with children columns
                     * for each aggregate dimension defined.
                     */
                    topAxis: [
                        {
                            dataIndex: "year",
                            header: i18next.t("YEAR"),
                            //labelRenderer: 'yearLabelRenderer'
                        },
                        {
                            dataIndex: "month",
                            header: i18next.t("MONTH"),
                            labelRenderer: "monthLabelRenderer",
                        },
                    ],
                },

                items: [
                    {
                        xtype: "toolbar",
                        shadow: false,
                        docked: "top",
                        items: [
                            {
                                xtype: "spacer",
                            },
                            {
                                text: i18next.t("CONFIGURATOR"),
                                handler: "showConfigurator",
                                align: "right",
                                xtype: "button",
                                ui: "primary",
                            },
                            {
                                align: "right",
                                xtype: "button",
                                ui: "primary",
                                text: i18next.t("EXPORT"),
                                stretchMenu: true,
                                arrow: false,
                                menu: {
                                    defaults: {
                                        handler: "exportDocument",
                                        iconCls: "x-far fa-file-alt",
                                    },
                                    indented: false,
                                    items: [
                                        {
                                            text: "Excel xlsx (pivot table definition)",
                                            iconCls: "x-far fa-file-excel",
                                            cfg: {
                                                type: "pivotxlsx",
                                                matrix: true,
                                                fileName: "ExportPivot.xlsx",
                                            },
                                        },
                                        {
                                            text: "Excel xlsx (all items)",
                                            iconCls: "x-far fa-file-excel",
                                            cfg: {
                                                type: "excel07",
                                                fileName: "ExportAll.xlsx",
                                            },
                                        },
                                        {
                                            text: "Excel xlsx (visible items)",
                                            iconCls: "x-far fa-file-excel",
                                            cfg: {
                                                type: "excel07",
                                                fileName: "ExportVisible.xlsx",
                                                onlyExpandedNodes: true,
                                            },
                                        },
                                        {
                                            text: "Excel xml (all items)",
                                            iconCls: "x-far fa-file-excel",
                                            cfg: {
                                                type: "excel03",
                                                fileName: "ExportAll.xml",
                                            },
                                        },
                                        {
                                            text: "Excel xml (visible items)",
                                            iconCls: "x-far fa-file-excel",
                                            cfg: {
                                                type: "excel03",
                                                fileName: "ExportVisible.xml",
                                                onlyExpandedNodes: true,
                                            },
                                        },
                                        {
                                            text: "CSV (all items)",
                                            cfg: {
                                                type: "csv",
                                                fileName: "ExportAll.csv",
                                            },
                                        },
                                        {
                                            text: "CSV (visible items)",
                                            cfg: {
                                                type: "csv",
                                                fileName: "ExportVisible.csv",
                                                onlyExpandedNodes: true,
                                            },
                                        },
                                        {
                                            text: "TSV (all items)",
                                            cfg: {
                                                type: "tsv",
                                                fileName: "ExportAll.csv",
                                            },
                                        },
                                        {
                                            text: "TSV (visible items)",
                                            cfg: {
                                                type: "tsv",
                                                fileName: "ExportVisible.csv",
                                                onlyExpandedNodes: true,
                                            },
                                        },
                                        {
                                            text: "HTML (all items)",
                                            iconCls: "x-fab fa-html5",
                                            cfg: {
                                                type: "html",
                                                fileName: "ExportAll.html",
                                            },
                                        },
                                        {
                                            text: "HTML (visible items)",
                                            iconCls: "x-fab fa-html5",
                                            cfg: {
                                                type: "html",
                                                fileName: "ExportVisible.html",
                                                onlyExpandedNodes: true,
                                            },
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                ],
            }}
        />
    );
}
