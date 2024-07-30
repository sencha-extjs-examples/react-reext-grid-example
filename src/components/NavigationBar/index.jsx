import { useCallback, useRef } from "react";
import ReExt from "@gusmano/reext";
import i18next from "i18next";

import { useAppStore } from "../../contexts";

export function NavigationBar({ menus = [] }) {
  const darkModeRef = useRef(null);
  const { state, setThemeDarkMode, setThemePalette } = useAppStore();

  const onAboutHandler = () => {
    Ext?.create({
      xtype: "dialogAbout",
      modal: true,
      closable: true
    }).show();
  };

  const handleChangeMenu = (target) => {
    const theme = target.value;
    const locale = target.locale;

    const searchParams = new URLSearchParams(window.location.search);

    if (theme) {
      searchParams.set("theme", theme);
      window.location = `${
      window.location.origin
      }?${searchParams.toString()}`;
    }

    if (locale) {
      searchParams.set("locale", locale);

      window.location = `${
      window.location.origin
      }?${searchParams.toString()}`;
    }
  };

  const handleDarkMode = useCallback(() => {
    darkModeRef.current = new Date().getTime();

    setThemeDarkMode(!state.darkMode);
  }, [setThemeDarkMode, state.darkMode]);

  const handleColorChange = useCallback(
    (target) => {
      setThemePalette(target.baseColor);
    },
    [setThemePalette]
  );

  return (
    <ReExt
      xtype="toolbar"
      config={{
        titleAlign: "left",
        docked: "top",
        style: { background: "var(--base-app-toolbar, #024059)" },
        layout: {
          type: "hbox",
          align: "stretch"
        },
        defaults: {
          margin: "0 10 0 0",
          ui: "flat"
        },
        items: [
        ...menus,
        {
          align: "right",
          id: "materialThemeMenuButton",
          hidden: state.theme !== "material",
          iconCls: ["x-font-icon", "palette"],
          arrow: false,
          menu: {
            itemId: "materialThemeMenu",
            defaults: {
              handler: handleColorChange
            },
            indented: false,
            items: [
            {
              xtype: "togglefield",
              labelAlign: "left",
              cls: "dark-mode-cb",
              boxLabel: state.darkMode ?
              "Dark Mode" :
              "Light Mode",
              value: state.darkMode ? 1 : 0,
              reference: "darkMode",
              listeners: {
                change: handleDarkMode
              }
            },
            {
              text: "America's Captain",
              baseColor: "red"
            },
            {
              text: "Royal Appeal",
              baseColor: "deepPurple"
            },
            {
              text: "Creamsicle",
              baseColor: "deepOrange",
              accentColor: "grey"
            },
            {
              text: "Mocha Pop",
              baseColor: "brown"
            },
            {
              text: "Dry Shores",
              baseColor: "blueGrey"
            },
            {
              text: "Bubble Gum",
              baseColor: "pink"
            },
            {
              text: "120° Compliments",
              baseColor: "green"
            },
            {
              text: "Roboto House",
              baseColor: "grey"
            },
            {
              text: "Daylight & Tungsten",
              baseColor: "blue"
            }]

          }
        },
        {
          xtype: "button",
          iconCls: "x-tool-type-menu",
          arrow: false,
          margin: 0,
          menu: {
            defaults: {
              handler: handleChangeMenu
            },
            indented: false,
            items: [
            {
              text: "Material theme",
              value: "material"
            },
            {
              text: "IOS theme",
              value: "ios"
            },
            {
              text: "Triton theme",
              value: "triton"
            },
            {
              text: "Neptune theme",
              value: "neptune",
              handler: undefined
            },
            {
              text: i18next.t("LANGUAGE"),
              iconCls: "x-fa fa-globe-americas",
              separator: true,
              menu: {
                defaults: {
                  handler: handleChangeMenu
                },
                items: [
                {
                  text: "English",
                  locale: "en"
                },
                {
                  text: "Português",
                  locale: "pt"
                },
                {
                  text: "Español",
                  locale: "es"
                },
                {
                  text: "Français",
                  locale: "fr"
                },
                {
                  text: "Italiano",
                  locale: "it"
                },
                {
                  text: "Deutsch",
                  locale: "de"
                }]

              }
            },
            {
              text: i18next.t("DOCUMENTATION"),
              iconCls: "x-fa fa-file",
              separator: true,
              menu: {
                items: [
                {
                  text: "Ext JS",
                  iconCls: "x-fa fa-building",
                  href: "https://docs.sencha.com/extjs/latest/",
                  target: "_blank"
                },
                {
                  text: "React ReExt",
                  iconCls: "x-fa fa-atom",
                  href: "http://marcgusmano.com/ReExt/",
                  target: "_blank"
                }]

              }
            },
            {
              text: i18next.t("ABOUT"),
              iconCls: "x-fa fa-info",
              separator: true,
              handler: onAboutHandler
            },
            {
              text: i18next.t("COMMUNITY"),
              iconCls: "x-fab fa-discord",
              href: "https://discord.gg/RfxMGSbHXT",
              target: "_blank",
              handler: undefined
            },
            {
              text: "GitHub",
              iconCls: "x-fab fa-github",
              href: "https://github.com/sencha-extjs-examples/react-reext-grid-example",
              target: "_blank",
              handler: undefined
            }]

          }
        }]

      }} rid="1721246611168" />);


}