import ReExt from "@gusmano/reext";
import { useAppStore } from "../../contexts/AppStore";
import { GridComplex } from "../grid/complex";
import { GridGrouped } from "../grid/grouped";
import { GridPivot } from "../grid/pivot";

export default function MainView() {
    const { setMainTabChange } = useAppStore();

    return (
        <ReExt
            xtype="tabpanel"
            style={{ height: "100%" }}
            config={{
                height: "calc(100vh - 48px)",
                tabBarPosition: "top",
                flex: 1,
                tabBar: {
                    layout: {
                        pack: "center",
                    },
                },
            }}
            onTabchange={(_tabs, newTab) => {
                setMainTabChange(newTab);
            }}
        >
            <div title="Ext.grid.Grid">
                <GridComplex />
            </div>

            <div title="Ext.grid.Treegrouped">
                <GridGrouped />
            </div>
            <div title="Ext.pivot.Grid">
                <GridPivot />
            </div>
        </ReExt>
    );
}
