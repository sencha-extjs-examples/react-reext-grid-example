import React from "react";
import ReExt from "@gusmano/reext";
import i18next from "i18next";

import "./ComplexGridRowModel";
import "./ComplexGridController";

export function GridComplex() {
    return (
        <ReExt
            xtype="grid"
            config={{
                width: "100vw",
                height: "calc(100vh - 96px)",
                controller: "complexgridcontroller",
                store: {
                    type: "employeeStoreExample",
                    groupField: "department",
                },
                plugins: {
                    // gridsummaries: true,
                    cellediting: true,
                    //rowedit: true,
                    gridviewoptions: true, //Does not work with Locked grid
                    summaryrow: true,
                    rowexpander: true,
                    gridexporter: true,
                    //rowoperations: true,
                    //gridpagingtoolbar: true,
                    gridfilterbar: true,

                    // Propagates numeric values when the selection is extended in the Y axis
                    clipboard: true,
                    selectionreplicator: true,
                },
                groupFooter: {
                    xtype: "gridsummaryrow",
                    viewModel: {
                        type: "complexgridrowmodel",
                    },
                },
                selectable: {
                    // Disables sorting by header click, though it will be still available via menu
                    columns: true,
                    cells: false,
                    checkbox: true,
                    drag: false,
                    //extensible: 'y',
                    checkboxColumnIndex: 0,
                },
                startCollapsed: false,
                summaryPosition: "docked",
                groupSummaryPosition: "top",
                groupHeaderTpl: "{name} ({group.length})",
                rowLines: true,
                columnLines: true,
                listeners: {
                    documentsave: "onDocumentSave",
                    beforedocumentsave: "onBeforeDocumentSave",
                    columnmenucreated: "onColumnMenuCreated",
                },
                itemConfig: {
                    viewModel: {
                        formulas: {
                            isGroupRecord: function (get) {
                                if (get("record").get("employeeNo") === 0) {
                                }

                                return (
                                    get("record").isGroup === true ||
                                    get("record").isSummary === true
                                );
                            },
                        },
                    },
                    body: {
                        tpl: [
                            '<img src="{avatar}" height="100px" style="float:left;margin:0 10px 5px 0">',
                            "<b>{name}<br></b>{dob:date}<br> {bio}",
                        ],
                    },
                },
                helperTpl: [
                    "<ul>",
                    '<tpl for="group.data.items">',
                    "<li>{data.fullName:htmlEncode}</li>",
                    "</tpl>",
                    "</ul>",
                ],
                groupHeader: {
                    tpl: [
                        "<tpl if=\"groupField == 'countryName'\">",
                        '<img src="./resources/shared/images/flags/w20/{[values.children[0].data["countryCode"]]}.png"/>',
                        "</tpl> ",
                        "<tpl if=\"groupField == 'color'\">",
                        '<span style="color: {[values.children[0].data["color"]]};" class="x-fa fa-tshirt"></span>',
                        "</tpl> ",
                        "{name} ({count})",
                    ],
                    // Item headers can also have tools.
                    tools: {
                        print: {
                            handler: "onGroupPrint",
                            tooltip: i18next.t("PRINT_GROUP"),
                            // Item headers have "start" (the default),
                            // "end" and "tail" zones:
                            zone: "tail",
                        },
                        chart: {
                            xtype: "button",
                            iconCls: "x-fa fa-chart-bar",
                            arrow: false,
                            tooltip: i18next.t("CHARTS"),
                            // Item headers have "start" (the default),
                            // "end" and "tail" zones:
                            zone: "tail",
                            menu: {
                                items: [
                                    {
                                        text: "Pie",
                                        menu: [
                                            {
                                                text: "Pie",
                                                handler: "onChartGroup",
                                                senchaChartConfig: {
                                                    xtype: "piechartexample",
                                                    bind: {
                                                        store: "{salaries}",
                                                        // theme: '{menuGroups.charttheme}'
                                                    },
                                                    theme: "custom-theme",
                                                },
                                                fusionChartsConfig: {
                                                    //TODO - Phase 2
                                                },
                                            },
                                            {
                                                text: "Donut",
                                                handler: "onChartGroup",
                                                senchaChartConfig: {
                                                    xtype: "donutpiechartexample",
                                                    bind: {
                                                        store: "{salaries}",
                                                    },
                                                    theme: "custom-theme",
                                                },
                                                fusionChartsConfig: {
                                                    //TODO - Phase 2
                                                },
                                            },
                                        ],
                                    },
                                    {
                                        text: "Bar",
                                        handler: "onChartGroup",
                                        senchaChartConfig: {
                                            xtype: "barchartexample",
                                            bind: {
                                                store: "{salaries}",
                                            },
                                            theme: "custom-theme",
                                        },
                                        fusionChartsConfig: {
                                            //TODO - Phase 2
                                        },
                                    },
                                    {
                                        text: "Column",
                                        handler: "onChartGroup",
                                        senchaChartConfig: {
                                            xtype: "columnchartexample",
                                            bind: {
                                                store: "{salaries}",
                                            },
                                            theme: "custom-theme",
                                        },
                                        fusionChartsConfig: {
                                            //TODO - Phase 2
                                        },
                                    },
                                    {
                                        text: "Line",
                                        handler: "onChartGroup",
                                        senchaChartConfig: {
                                            xtype: "linechartexample",
                                            bind: {
                                                store: "{salaries}",
                                            },
                                            theme: "custom-theme",
                                        },
                                        fusionChartsConfig: {
                                            //TODO - Phase 2
                                        },
                                    },
                                    {
                                        text: "More Sencha Ext JS Charts examples",
                                        href: "https://examples.sencha.com/extjs/latest/examples/kitchensink/?modern#charts",
                                        target: "_blank",
                                        separator: true,
                                        clickHideDelay: 10,
                                    },
                                    {
                                        text: "Go to fusioncharts.com",
                                        href: "https://www.fusioncharts.com/",
                                        target: "_blank",
                                        separator: true,
                                        clickHideDelay: 10,
                                    },
                                ],
                            },
                        },

                        save: {
                            handler: "onGroupSave",
                            tooltip: i18next.t("SAVE_GROUP"),
                            weight: -1,
                        },

                        refresh: {
                            handler: "onGroupRefresh",
                            tooltip: i18next.t("REFRESH_GROUP"),
                        },
                    },
                },
                items: [
                    {
                        xtype: "toolbar",
                        shadow: false,
                        docked: "top",
                        items: [
                            {
                                xtype: "button",
                                ui: "primary",
                                text: i18next.t("TRY_EXTJS"),
                                handler: "onTryButtonTap"
                            },
                            {
                                xtype: "spacer",
                            },
                            {
                                xtype: "button",
                                ui: "primary",
                                text: i18next.t("EXPORT"),
                                stretchMenu: true,
                                arrow: false,
                                menu: {
                                    defaults: {
                                        handler: "exportDocument",
                                    },
                                    indented: false,
                                    items: [
                                        {
                                            text: "Excel xlsx",
                                            cfg: {
                                                type: "excel07",
                                                ext: "xlsx",
                                                includeGroups: true,
                                                includeSummary: true,
                                            },
                                        },
                                        {
                                            text: "Excel xml",
                                            cfg: {
                                                type: "excel03",
                                                ext: "xml",
                                                includeGroups: true,
                                                includeSummary: true,
                                            },
                                        },
                                        {
                                            text: "CSV",
                                            cfg: {
                                                type: "csv",
                                            },
                                        },
                                        {
                                            text: "TSV",
                                            cfg: {
                                                type: "tsv",
                                                ext: "csv",
                                            },
                                        },
                                        {
                                            text: "HTML",
                                            cfg: {
                                                type: "html",
                                                includeGroups: true,
                                                includeSummary: true,
                                            },
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                ],
                columns: [
                    {
                        menuDisabled: true,
                        hideable: false,
                        sortable: false,
                        groupable: false,
                        ignore: true,
                        ignoreExport: true,
                        align: "center",
                        text: '<span class="x-fa fa-image"></span>',
                        width: 58,
                        cell: {
                            xtype: "widgetcell",
                            encodeHtml: false,
                            widget: {
                                xtype: "container",
                                layout: "center",
                                items: [
                                    {
                                        xtype: "avatar",
                                        bind: {
                                            fullName: "{record.fullName}",
                                        },
                                        height: 30, // Set appropriate height
                                        width: 30, // Set appropriate width
                                    },
                                ],
                            },
                        },
                    },
                    {
                        text: i18next.t("NAME"),
                        width: 200,
                        dataIndex: "fullName",
                    },
                    {
                        text: i18next.t("AGE"),
                        dataIndex: "age",
                        filterType: "number",
                        editable: true,
                        width: 80,
                        align: "center",
                        cell: {
                            encodeHtml: false,
                        },
                        summary: "average",
                        formatter: "number(0)",
                        exportStyle: {
                            format: "General Number",
                            alignment: {
                                horizontal: "Right",
                            },
                        },
                    },
                    {
                        text: i18next.t("COUNTRY"),
                        dataIndex: "countryName",
                        editable: false,
                        width: 200,
                        cell: {
                            encodeHtml: false,
                        },
                        renderer: function (
                            value,
                            record,
                            dataIndex,
                            cell,
                            column
                        ) {
                            return (
                                '<span><img src="/resources/shared/images/flags/w20/' +
                                record.get("countryCode") +
                                '.png" /> ' +
                                record.get("countryName") +
                                "</span>"
                            );
                        },
                    },
                    {
                        text: i18next.t("DEPARTMENT"),
                        dataIndex: "department",
                        width: 140,
                        groupable: true,
                        editable: true,
                        filterType: "string",
                    },
                    {
                        text: i18next.t("PROGRESS"),
                        tooltip: i18next.t("PROGRESS_TOOLTIP"),
                        width: 150,
                        ignoreExport: true,
                        align: "center",
                        dataIndex: "progress",
                        cell: {
                            xtype: "widgetcell",
                            widget: {
                                xtype: "sectorprogress",
                                textTpl: [
                                    '{percent:number("0")}%', // Optional text template to display percentage
                                ],
                            },
                        },
                    },
                    {
                        text: i18next.t("VERIFIED"),
                        xtype: "checkcolumn",
                        headerCheckbox: true,
                        dataIndex: "verified",
                        filterType: "boolean",
                        hideable: true,
                        ignoreExport: false,
                        width: 90,
                        cell: {
                            xtype: "checkcell",
                        },
                    },
                    {
                        text: i18next.t("LINK"),
                        dataIndex: "link",
                        width: 80,
                        align: "center",
                        summary: null,
                        cell: {
                            encodeHtml: false,
                        },
                        tpl: [
                            '<tpl if="employeeNo != 0">',
                            '<a target="_blank" href="https://sencha.com">Click me</a>',
                            "</tpl>",
                        ],
                    },
                    {
                        text: i18next.t("RATINGS"),
                        columns: [
                            {
                                text: "AVERAGE",
                                xtype: "numbercolumn",
                                dataIndex: "averageRating",
                                filterType: "number",
                                // We can average even calculated fields here:
                                summary: "average",
                                width: 75,
                                cell: {
                                    cls: "big-data-ratings-cell",
                                    bodyCls:
                                        '{ratingGroup:pick("under4","under5","under6","over6")}',
                                },
                                exportStyle: {
                                    format: "Standard",
                                    alignment: {
                                        horizontal: "Right",
                                    },
                                },
                            },
                            {
                                text: i18next.t("ALL"),
                                dataIndex: "rating",
                                align: "center",
                                ignoreExport: true,
                                cell: {
                                    xtype: "widgetcell",
                                    forceWidth: true,
                                    widget: {
                                        xtype: "sparklineline",
                                    },
                                },
                            },
                        ],
                    },
                    {
                        text: i18next.t("JOIN_DATE"),
                        dataIndex: "joinDate",
                        filterType: "date",
                        editable: true,
                        xtype: "datecolumn",
                        width: 115,
                        // you can define an export style for a column
                        // you can set alignment, format etc
                        exportStyle: [
                            {
                                // no type key is defined here which means that this is the default style
                                // that will be used by all exporters
                                format: "Medium Date",
                                alignment: {
                                    horizontal: "Right",
                                },
                            },
                            {
                                // the type key means that this style will only be used by the csv exporter
                                // and for all others the default one, defined above, will be used
                                type: "csv",
                                format: "Short Date",
                            },
                        ],
                    },
                    {
                        text: i18next.t("SLIDER_BOUND_TO_AGE"),
                        dataIndex: "age",
                        width: 120,
                        ignoreExport: true,
                        align: "center",
                        groupable: false,
                        cell: {
                            xtype: "widgetcell",
                            widget: {
                                xtype: "sliderfield",
                                margin: 5,
                            },
                        },
                    },
                    {
                        // TODO: make it work
                        tooltip: i18next.t("COLOR"),
                        dataIndex: "color",
                        text: '<span class="x-fa fa-tshirt"></span>',
                        width: 110,
                        editable: true,
                        ignore: true,
                        hideable: false,
                        ignoreExport: false,
                        groupable: true,
                        align: "center",
                        editor: {
                            xtype: "colorfield",
                        },
                        cell: {
                            encodeHtml: false,
                        },
                        renderer: function (
                            value,
                            record,
                            dataIndex,
                            cell,
                            column
                        ) {
                            return (
                                '<span style="color:' +
                                record.get("color") +
                                ';" class="x-fa fa-tshirt"></span>'
                            );
                        },
                    },
                    {
                        text: i18next.t("NOTICE_PERIOD"),
                        width: 120,
                        dataIndex: "noticePeriod",
                        filterType: "string",
                        editable: true,
                    },
                    {
                        text: i18next.t("EMAIL"),
                        dataIndex: "email",
                        filterType: "string",
                        editable: true,
                        editor: {
                            xtype: "emailfield",
                        },
                        width: 250,
                    },
                    {
                        text: i18next.t("ABSENCES"),
                        defaults: {
                            exportStyle: {
                                alignment: {
                                    horizontal: "Center",
                                },
                            },
                        },
                        columns: [
                            {
                                xtype: "numbercolumn",
                                text: i18next.t("ILLNESS"),
                                dataIndex: "sickDays",
                                filterType: "number",
                                align: "center",
                                format: "0",
                            },
                            {
                                xtype: "numbercolumn",
                                text: i18next.t("HOLIDAYS"),
                                dataIndex: "holidayDays",
                                filterType: "number",
                                align: "center",
                                format: "0",
                            },
                            {
                                text: i18next.t("HOLIDAY_ALLOWANCE"),
                                dataIndex: "holidayAllowance",
                                filterType: "number",
                                align: "center",
                                formatter: 'number("0.00")',
                            },
                        ],
                    },
                    {
                        text: i18next.t("RATING_THIS_YEAR"),
                        dataIndex: "ratingThisYear",
                        formatter: "round(1)",
                        summary: "average",
                        // Adjust the header text when grouped by this column:
                        groupHeaderTpl:
                            '{value:repeat("★")} ({value:plural("Star")})',
                        cell: {
                            xtype: "widgetcell",
                            widget: {
                                xtype: "rating",
                            },
                        },
                        exportStyle: {
                            alignment: {
                                horizontal: "Right",
                            },
                        },
                    },
                    {
                        text: i18next.t("SALARY"),
                        dataIndex: "salary",
                        filterType: "number",
                        formatter: "usMoney",
                        width: 150,
                        align: "right",
                        editor: {
                            xtype: "numberfield",
                            validators: [{ type: "bound", max: 1e7, min: 1e4 }],
                        },
                        summary: "average",
                        summaryRenderer: "salarySummaryRenderer",
                        exportStyle: {
                            format: "Currency",
                            alignment: {
                                horizontal: "Right",
                            },
                        },
                    },
                    {
                        text: "",
                        width: 100,
                        hideable: false,
                        ignore: true,
                        ignoreExport: true,
                        align: "center",
                        cell: {
                            xtype: "widgetcell",
                            widget: {
                                xtype: "button",
                                ui: "info",
                                text: i18next.t("VERIFY"),
                                bind: {
                                    tooltip: `${i18next.t(
                                        "VERIFY"
                                    )} {record.fullName}`,
                                },
                                handler: "onVerifyTap",
                            },
                        },
                        // Summary rows do not create widgetcells unless set as
                        // the summaryCell
                        summaryCell: {
                            xtype: "widgetcell",
                            widget: {
                                xtype: "button",
                                ui: "green",
                                text: "All",
                                handler: "onVerifyAllTap",
                            },
                        },
                    },
                    {
                        text: i18next.t("ACTIONS"),
                        width: 80,
                        ignoreExport: true,
                        cell: {
                            tools: {
                                menu: "onMenu",
                                gear: {
                                    handler: "onGear",
                                    // tooltip: 'Change settings...',

                                    // Cells offer a start or end "zone" for tools:
                                    zone: "end",

                                    // Use record binding for dynamic configuration:
                                    // disabled: '{record.age < 18}',

                                    //TODO Add a formula
                                    tooltip: "{changeSettings}",
                                },
                            },
                        },
                    },
                ],
                // used by Controller
                toolContextMenu: {
                    xtype: "menu",
                    anchor: true,
                    padding: 10,
                    minWidth: 150,
                    viewModel: {},
                    items: [
                        {
                            xtype: "avatar",
                            bind: {
                                fullName: "{record.fullName}",
                            },
                            height: 80, // Set appropriate height
                            width: 80, // Set appropriate width
                        },
                        {
                            text: i18next.t("EDIT"),
                            separator: true,
                            margin: "10 0 0",
                            handler: "startEditing",
                            iconCls: "x-fa fa-cog",
                        },
                        {
                            text: i18next.t("SHARE"),
                            handler: "tryExtJS",
                            margin: "10 0 0",
                            iconCls: "x-far fa-share-square",
                        },
                        {
                            text: i18next.t("RATE_SPEAKER"),
                            handler: "tryExtJS",
                            margin: "10 0 0",
                            iconCls: "x-fa fa-star",
                        },
                    ],
                },
            }}
        />
    );
}
