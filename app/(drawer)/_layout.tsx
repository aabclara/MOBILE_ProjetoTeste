import { Drawer } from 'expo-router/drawer';
import React from 'react';

export default function DrawerLayout() {
    return (
        <Drawer
            screenOptions={{
                headerShow: true
            }}
        >
            <Drawer.Screen
                name="(tabs)"
                options={{
                    drawerLabel: "Painel",
                    title: "EcoField"
                }}
            />
        </Drawer>
    );
}