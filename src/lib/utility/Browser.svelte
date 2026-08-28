<script lang="ts">
    import { Grid } from "@svar-ui/svelte-grid";
    import Trigger from "$lib/components/ui/sidebar//sidebar-trigger.svelte";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import Button from "@/components/ui/button/button.svelte";
    import { Separator } from "$lib/components/ui/separator/index.js";
    import XIcon from "@lucide/svelte/icons/x";
    import * as b from "./browserTS.svelte";

    let { current, tabs, empty, tbAdd, tbRemove, data, columns } = $state(b);

    tabs.push({
        record: "PUSH",
        name: "Um push",
        icon: XIcon,
    } as b.Tab);

</script>

<div class="flex-1 p-2 overflow-hidden">
    <div class="flex items-center gap-2">
        <Trigger class="cursor-pointer" />
        <h1 class="text-xl font-bold flex">
            <!-- titulo da guia: -->
            {current.name}
        </h1>
    </div>
    <Tabs.Root value={current.record}>
        <!-- <Button
            onclick={() => {
                tabs.push({ id: "Efetivo:a", title: "Efetivo", icon: "" });
            }}>Add</Button
        > -->
        <Tabs.List>
            {#each tabs as tab, i}
                <Tabs.Trigger
                    onclick={() => {
                        current = tab;
                        console.log(
                            `b.current: ${b.current.name}\current: ${current.name}`,
                        );
                    }}
                    value={tab.record}
                    class="not-[hover]:*:opacity-0 hover:*:opacity-100 {current.record ==
                    tab.record
                        ? 'bg-primary font-bold data-active:text-white'
                        : ''}"
                >
                    {tab.name}
                    <Button
                        variant="outline"
                        class="p-1 m-0 size-2"
                        onclick={() => {
                            tabs.includes(current)
                                ? (current = tabs[0])
                                : (current = tabs[0]);
                            tbRemove(i - 1);
                        }}
                    >
                        <XIcon /></Button
                    >
                </Tabs.Trigger>
            {:else}
                <p class="text-destructive px-2">
                    Selecione uma Tabela para visualizar.
                </p>
            {/each}
        </Tabs.List>
        {#each tabs as tab}
            <Tabs.Content value={tab.record}>
                Esse é o conteudo da ABA: {tab.record}:{tab.name}.
                <p>oi {current.name}</p>
            </Tabs.Content>
        {/each}
        <!-- Container isolado para o SVAR DataGrid -->
        <Separator class="m-1" />
        <p>
            {tabs.length <= 1
                ? "Selecione alguma tabela para visualizar os dados!"
                : ""}
        </p>
        <!-- <div
            style="height: 500px; width: 100%;"
            class="rounded-lg border border-border bg-card p-2 shadow-sm"
        >
            <Grid
                {data}
                {columns}
                undo={true}
                tree={true}
                autoRowHeight={true}
            />
        </div> -->
    </Tabs.Root>
</div>
