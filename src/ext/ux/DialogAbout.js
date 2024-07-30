import { Ext_define } from "@gusmano/reext";
import i18next from "i18next";

Ext_define("ReExtExample.ux.DialogAbout", {
    extend: "Ext.Dialog",
    alias: "widget.dialogAbout",

    title: `${i18next.t("ABOUT")} - Sencha ReExt JS Grid`,

    layout: "fit",
    height: 420,
    // width: 320,
    items: [
        {
            xtype: "formpanel",
            defaults: {
                labelAlign: "left",
                labelWidth: 120,
            },
            items: [
                {
                    xtype: "displayfield",
                    labelAlign: "left",
                    label: "Ext JS Version",
                    value: Ext.versions.extjs.version,
                },
                {
                    xtype: "displayfield",
                    labelAlign: "left",
                    label: "Ext JS Toolkit",
                    value: Ext.manifest.toolkit,
                },
                {
                    xtype: "displayfield",
                    labelAlign: "left",
                    label: "Theme",
                    value: Ext.ReExtTheme,
                },
                {
                    xtype: "displayfield",
                    labelAlign: "left",
                    label: "Locale",
                    value: Ext.Boot.config.locale,
                },
                {
                    xtype: "displayfield",
                    label: "Localization",
                    value: "https://github.com/i18next/i18next",
                },
                {
                    xtype: "displayfield",
                    label: "Styled Components",
                    value: "https://styled-components.com",
                },
                {
                    xtype: "displayfield",
                    label: "Loading Skeleton",
                    value: "https://www.npmjs.com/package/react-loading-skeleton",
                },
            ],
        },
    ],
});
