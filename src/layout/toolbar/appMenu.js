import i18next from "i18next";

export function getAppMenu() {
    const menus = [
        {
            xtype: "component",
            cls: ["x-fab fa-react", "flex-button center"],
            html: "ReExt(React Grid)",
            flex: 1,
            style: "color: #fff; display: flex; align-items: center;",
        },
    ];

    if (Ext?.os.is.Desktop) {
        return [
            ...menus,
            {
                xtype: "button",
                text: i18next.t("VIDEO_TOUR"),
                iconCls: "x-fab fa-youtube",
                handler: function (button) {
                    window.open("https://youtu.be/oB0v2aEDTFY", "_blank");
                },
            },
            {
                xtype: "button",
                text: i18next.t("EXAMPLE_EXTJS"),
                tooltip: i18next.t("EXAMPLE_EXTJS_TOOLTIP"),
                ui: "green",
                iconCls: "ext ext-sencha",
                handler: function () {
                    window.open("https://www.sencha.com/gridpanel/", "_blank");
                },
            },
        ];
    }

    return menus;
}
