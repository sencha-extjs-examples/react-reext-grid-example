import { extLoadFiles } from "../ext/scripts/extLoadFiles";
import { getLocalePath } from "./setupExtConfig";

export class ExtArtifacts {
    static async setup({ locale = "en" }) {
        const instance = new ExtArtifacts();

        try {
            instance.initTooltip();
            instance.initSimManager();
            instance.loadLocale(locale);

            await extLoadFiles();
        } catch (error) {
            console.error(
                "Error loading Ext artifacts! See console for details."
            );
            console.error(error);
        }
    }

    loadLocale(locale) {
        Ext?.Boot.setConfig("locale", locale);

        if (locale !== "en") {
            const localeFile = getLocalePath(locale);

            Ext?.Loader.loadScript({
                url: localeFile,
                onLoad: function () {
                    console.log(`loadJS ${localeFile}`);
                },
            });
        }
    }

    initTooltip() {
        /**
         * Set `true` to enable quick tips to be read from the DOM and displayed.
         * Ref https://docs.sencha.com/extjs/7.8.0/modern/Ext.tip.Manager.html
         */
        if (Ext?.tip.Manager) {
            new Ext.tip.Manager(true);
        }
    }

    initSimManager() {
        /**
         * This singleton manages simulated Ajax responses
         * Ref https://docs.sencha.com/extjs/7.8.0/modern/Ext.ux.ajax.SimManager.html
         */
        Ext?.ux.ajax.SimManager.init({ defaultSimlet: null });
    }
}
