<script lang="ts">
  import { Grid } from "@svar-ui/svelte-grid";

  // Sidebar e Ícones
  import CalendarIcon from "@lucide/svelte/icons/calendar";
  import HouseIcon from "@lucide/svelte/icons/house";
  import InboxIcon from "@lucide/svelte/icons/inbox";
  import SearchIcon from "@lucide/svelte/icons/search";
  import SettingsIcon from "@lucide/svelte/icons/settings";
  import XIcon from "@lucide/svelte/icons/x";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import Button from "@/components/ui/button/button.svelte";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import { stopImmediatePropagation, stopPropagation } from "svelte/legacy";

  // Dados do Grid
  const countries = [
    { id: 1, label: "Gameleira, Pernambuco" },
    { id: 2, label: "Osasco, São Paulo" },
    { id: 3, label: "Japão" },
  ];

  const users = [
    { id: 101, label: "Aux. Adm" },
    { id: 102, label: "Administrador" },
    { id: 103, label: "Supervisor" },
  ];

  const data = [
    { id: 1, firstName: "Marcos", country: 1, date: new Date(), assigned: 101 },
    {
      id: 3,
      firstName: "Marcos 2",
      country: 2,
      date: new Date(),
      assigned: 103,
    },
    {
      id: 4,
      firstName: "Marcos 2",
      country: 2,
      date: new Date(),
      assigned: 103,
    },
    {
      id: 2,
      firstName: "Micael",
      country: 2,
      date: new Date(),
      assigned: 102,
    },
  ];

  type ComboOption = { id: string | number; label: string };

  const columns = [
    { id: "id", header: "ID", width: 50 },
    { id: "firstName", header: "Nome", editor: "text", width: 180 },
    {
      id: "country",
      header: "Cidade",
      editor: {
        type: "combo",
        config: {
          template: (option: ComboOption) => `${option.id}. ${option.label}`,
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
  ];

  // Sidebar:
  const items = [
    { title: "Efetivo", url: "#", icon: HouseIcon },
    { title: "Cargo & Empresa", url: "#", icon: InboxIcon },
    { title: "Passagens & Alojamento", url: "#", icon: CalendarIcon },
    { title: "Pesquisar", url: "#", icon: SearchIcon },
    { title: "Personalizar", url: "#", icon: SettingsIcon },
  ];

  // ABAS:
  let abas = $state([
    { id: "0", title: "ABA", icon: "" },
    { id: "1", title: "ABA1", icon: "" },
    { id: "2", title: "ABA2", icon: "" },
    { id: "3", title: "ABA3", icon: "" },
  ]);
  let abaSelected = $state({ id: abas[0].id, title: abas[0].title });
</script>

<!-- 1. O Provider é obrigatório para controlar o estado/estilos do Sidebar -->
<Sidebar.Provider>
  <div class="flex h-screen w-full">
    <!-- 2. Barra Lateral -->
    <Sidebar.Root variant="sidebar" collapsible="offcanvas">
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.GroupLabel>Tabelas - Cliente SurrealDB</Sidebar.GroupLabel>
          <Sidebar.GroupContent>
            <Sidebar.Menu>
              {#each items as item (item.title)}
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton>
                    {#snippet child({ props })}
                      <a href={item.url} {...props}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    {/snippet}
                  </Sidebar.MenuButton>
                </Sidebar.MenuItem>
              {/each}
            </Sidebar.Menu>
          </Sidebar.GroupContent>
        </Sidebar.Group>
      </Sidebar.Content>
      <Sidebar.Footer>
        <Sidebar.MenuButton>
          <a href="/#" class="flex flex-1 gap-3">
            <SettingsIcon class="mt-0.5" />
            <span>Configurações</span>
          </a>
        </Sidebar.MenuButton>
      </Sidebar.Footer>
    </Sidebar.Root>

    <!-- 3. Conteúdo Principal (Garante o botão Trigger e a Grid lado a lado) -->
    <main class="flex-1 p-2 overflow-hidden">
      <div class="flex items-center gap-2">
        <Sidebar.Trigger class="cursor-pointer" />
        <h1 class="text-xl font-bold flex">
          <!-- titulo da guia: -->
          {abaSelected.title}
        </h1>
      </div>
      <Tabs.Root value={abaSelected.id}>
        <Button
          onclick={() => {
            abas.push({ id: "Efetivo:a", title: "Efetivo", icon: "" });
          }}>Add</Button
        >
        <Tabs.List>
          {#if abas.length <= 0}
            {(abas = [{ id: "vazio", title: "vazio", icon: "" }])}
            <Tabs.Trigger value="vazio">VAZIO!</Tabs.Trigger>
          {:else}
            {abas[0].title == "vazio" && abas.length >= 2 ? abas.shift() : ""}
          {/if}
          {#each abas as aba, i}
            <Tabs.Trigger
              onclick={() => (abaSelected = aba)}
              value={aba.id}
              class="not-[hover]:*:opacity-0 hover:*:opacity-100 {abaSelected.id ==
              aba.id
                ? 'bg-primary font-bold data-active:text-white'
                : ''}"
            >
              {aba.title}
              <Button
                variant="outline"
                class="p-1 m-0 size-2"
                onclick={() => {
                  abas.splice(i, 1);
                }}
              >
                <XIcon /></Button
              >
            </Tabs.Trigger>
          {/each}
        </Tabs.List>
        {#each abas as aba}
          <Tabs.Content value={aba.id}>
            Esse é o conteudo da ABA: {aba.id}:{aba.title}.
            <p>oi {abaSelected.title}</p>
          </Tabs.Content>
        {/each}
        <Tabs.Content value="vazio">VAZIO!</Tabs.Content>
      </Tabs.Root>
      <Separator class="m-1" />

      <!-- Container isolado para o SVAR DataGrid -->
      <div
        style="height: 500px; width: 100%;"
        class="rounded-lg border border-border bg-card p-2 shadow-sm"
      >
        <Grid {data} {columns} multiselect={true} />
      </div>
    </main>
  </div>
</Sidebar.Provider>
