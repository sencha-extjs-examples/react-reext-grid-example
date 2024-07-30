/**
 * A long term solution would be to create a dynamic loading script using Node.js.
 * This script can define the files to be imported following a consistent naming convention,
 * such as name-ext.jsx or name.ext.jsx.
 */
export async function extLoadFiles() {
    /**
     * Loads the required Ext components by importing them asynchronously.
     * So when creating custom xtype's they will be registered at the beginning of the application.
     */
    await import("../ux/charts/CustomTheme");
    await Promise.all([
        import("../ux/Avatar"),
        import("../ux/SectorProgress"),
        import("../ux/DialogAbout"),
        import("../ux/charts/Dialog"),
        import("../ux/charts/bar/Bar"),
        import("../ux/charts/bar/Column"),
        import("../ux/charts/line/Line"),
        import("../ux/charts/pie/Pie"),
        import("../ux/charts/pie/Donut"),

        /**
         * If you prefer, load stories asynchronously at the start of the application.
         */
        import("../store/SaleStore"),
        import("../store/EmployeeStore"),
    ]);

    console.info("Ext custom files loaded");
}
