import TableIcon from "@lucide/svelte/icons/table";
import type { Component } from "svelte";

interface Tab {
    record: any;
    name: String;
    icon: typeof TableIcon;
    item?: Component;
}

let empty = {
    record: "empty",
    name: "Tabela",
    icon: TableIcon,
} as Tab;
let tabs = $state<Tab[]>([]);
export let current = $state<Tab>(empty);


export function tbAdd(tabList: Tab[]) {
    tabList.map(t => tabs.push(t));
}

export function tbRemove(index: number) {
    tabs.splice(index, 1);
}

export { type Tab, tabs, empty };

// ----------------

// Dados do Grid
const countries = [
    { id: 1, label: "Gameleira, Pernambuco" },
    { id: 2, label: "Osasco, São Paulo" },
    { id: 3, label: "Japão" },
    { id: "Aux. Adm", label: "Micael" },
];

const users = [
    { id: 101, label: "Aux. Adm" },
    { id: 102, label: "Administrador" },
    { id: 103, label: "Supervisor" },
];

type ComboOption = { id: string | number; label: string };

// Values:

export let data = $state([
    {
        id: 1,
        firstName: "Marcos",
        cidade: 1,
        date: new Date(),
    },
    {
        id: 2,
        firstName: "Marcos 2",
        cidade: 2,
        date: new Date(),
    },
    {
        id: 3,
        firstName: "Marcos 2",
        cidade: 2,
        date: new Date(),
    },
    {
        id: 4,
        firstName: "Micael",
        cidade: 2,
        date: new Date(),
    },
]);

export let columns = $state([
    { id: "id", header: "ID", width: 50, editor: "" },
    {
        id: "firstName",
        header: "Nome",
        editor: "text",
        width: 180,
    },
    {
        id: "cidade",
        header: "Nome cidade",
        editor: {
            type: "combo",
            config: {
                template: (option: ComboOption) =>
                    `${option.id} - ${option.label}`,
            },
        },
        options: countries,
        width: 180,
    },
    {
        id: "date",
        header: "Admissão",
        width: 180,
        editor: "datepicker",
        template: (v: Date | string | null | undefined) => {
            if (!v) return "";
            const d = typeof v === "string" ? new Date(v) : v;
            return d instanceof Date && !isNaN(d.getTime())
                ? d.toLocaleDateString("pt-BR")
                : "";
        },
    },
    {
        id: "assigned",
        header: "Cargo",
        width: 180,
        editor: "richselect",
        options: users,
    },
]);