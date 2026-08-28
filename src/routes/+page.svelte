<script lang="ts">
  // Sidebar e Ícones
  import CalendarIcon from "@lucide/svelte/icons/calendar";
  import HouseIcon from "@lucide/svelte/icons/house";
  import InboxIcon from "@lucide/svelte/icons/inbox";
  import SearchIcon from "@lucide/svelte/icons/search";
  import SettingsIcon from "@lucide/svelte/icons/settings";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import Browser from "$lib/utility/Browser.svelte";
  import * as b from "@/utility/browserTS.svelte";
  import { invoke } from "@tauri-apps/api/core";
  import { Grid } from "@svar-ui/svelte-grid";

  let { tabs, current, tbAdd } = b;

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

  let data = $state([
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

  let columns = $state([
    { id: "id", header: "ID", width: 50, editor: "", format: 'abc' },
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
          template: (option: ComboOption) => `${option.id} - ${option.label}`,
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

  // Sidebar:
  let items = $state([
    {
      table: { table: "efetivo", name: "Efetivo Diário" },
      title: "Efetivo",
      url: "#",
      icon: HouseIcon,
    },
  ]);
  let itemCurrent = $state("efetivo");

  // Banco:
  async function reloadItems() {
    items = [];
    try {
      // Retorna direto o dado que a função cuspir (ex: string[])
      const tables = await invoke<any>("query", { sql: "tables" });
      const clmns = await invoke<[]>("query", {
        sql: `metadata:${itemCurrent}`,
      });
      const dt = await invoke<[]>("query", { sql: `table:${itemCurrent}` });

      columns = clmns;
      data = dt;

      console.log("TABLES:", tables);
      console.log("CULUMNS:", clmns);
      console.log("DT:", dt);

      if (Array.isArray(tables)) {
        tables.forEach((t) => {
          items.push({
            table: t,
            title: `${t.name} - ${t.table}`,
            url: "#",
            icon: InboxIcon,
          });
        });
      }
    } catch (error) {
      console.error("Erro ao buscar tabelas do SurrealDB:", error);
    }
  }

  // ABAS:
  let abas = [
    {
      record: "empty",
      name: "Tabela",
      icon: CalendarIcon,
    },
    { record: "0", name: "ABA", icon: CalendarIcon },
    { record: "1", name: "ABA1", icon: CalendarIcon },
    { record: "2", name: "ABA2", icon: CalendarIcon },
    { record: "3", name: "ABA3", icon: CalendarIcon },
  ] as b.Tab[];

  tbAdd(abas);
  let abaSelected = $state({ id: abas[0].record, title: abas[0].name });
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
                      <a
                        onclick={() => {
                          reloadItems();
                          itemCurrent = item.table.table;
                        }}
                        href={item.url}
                        {...props}
                      >
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
    <!-- conteudo aqui -->
    <Browser />
    <div
      style="height: 500px; width: 100%;"
      class="rounded-lg border border-border bg-card p-2 shadow-sm"
    >
      <Grid
        bind:data
        bind:columns
        reorder={true}
        autoRowHeight={true}
      />
    </div>
  </div></Sidebar.Provider
>
