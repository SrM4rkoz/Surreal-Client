<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";
  import { Grid, Willow } from "@svar-ui/svelte-grid";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  // import AppSidebar from "$lib/components/app-sidebar.svelte";

  let { children } = $props();

  let name = $state("asdff");
  let greetMsg = $state("");

  async function greet(event: Event) {
    event.preventDefault();
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    greetMsg = await invoke("greet", { name });
  }

  // GRID:
  const data = [
    {
      id: 1,
      city: "Amieshire",
      email: "Leora13@yahoo.com",
      firstName: "Ernest",
      lastName: "Schuppe",
      companyName: "Lebsack - Nicolas",
    },
    {
      id: 2,
      city: "Gust",
      email: "Mose_Gerhold51@yahoo.com",
      firstName: "Janis",
      lastName: "Vandervort",
      companyName: "Glover - Hermiston",
    },
  ];

  const columns = [
    {
      id: "id",
      width: 80,
    },
    {
      id: "city",
      width: 100,
      header: "City",
      footer: "City",
    },
    {
      id: "firstName",
      header: "First Name",
      footer: "First Name",
      width: 150,
    },
    {
      id: "lastName",
      header: "Last Name",
      footer: "Last Name",
      width: 150,
    },
    {
      id: "email",
      header: "Email",
      footer: "Email",
    },
    {
      id: "companyName",
      header: "Company",
      footer: "Company",
    },
  ];
</script>

<main class="container">
  <!-- Sidebar: -->
  <Sidebar.Provider>
    <!-- <AppSidebar /> -->
    <div>
      <Sidebar.Trigger />
      {@render children?.()}
    </div>
  </Sidebar.Provider>

  <h1>Welcome to Tauri + Svelte</h1>

  <div class="row">
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo vite" alt="Vite Logo" />
    </a>
    <a href="https://tauri.app" target="_blank">
      <img src="/tauri.svg" class="logo tauri" alt="Tauri Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank">
      <img src="/svelte.svg" class="logo svelte-kit" alt="SvelteKit Logo" />
    </a>
  </div>
  <p>Click on the Tauri, Vite, and SvelteKit logos to learn more.</p>

  <form class="row" onsubmit={greet}>
    <input id="greet-input" placeholder="Enter a name..." bind:value={name} />
    <button type="submit">Greet</button>
  </form>
  <p>{greetMsg}</p>

  <!-- GRID: -->
  <Grid {data} {columns} />
</main>

<style>
  .logo.vite:hover {
    filter: drop-shadow(0 0 2em #747bff);
  }

  .logo.svelte-kit:hover {
    filter: drop-shadow(0 0 2em #f9fffc);
  }

  :root {
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;

    color: #0f0f0f;
    background-color: #f6f6f6;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  .container {
    margin: 0;
    padding-top: 10vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: 0.75s;
  }

  .logo.tauri:hover {
    filter: drop-shadow(0 0 2em #24c8db);
  }

  .row {
    display: flex;
    justify-content: center;
  }

  a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
  }

  a:hover {
    color: #535bf2;
  }

  h1 {
    text-align: center;
  }

  input,
  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    color: #0f0f0f;
    background-color: #ffffff;
    transition: border-color 0.25s;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  }

  button {
    cursor: pointer;
  }

  button:hover {
    border-color: #396cd8;
  }
  button:active {
    border-color: #396cd8;
    background-color: #e8e8e8;
  }

  input,
  button {
    outline: none;
  }

  #greet-input {
    margin-right: 5px;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      color: #f6f6f6;
      background-color: #2f2f2f;
    }

    a:hover {
      color: #24c8db;
    }

    input,
    button {
      color: #ffffff;
      background-color: #0f0f0f98;
    }
    button:active {
      background-color: #0f0f0f69;
    }
  }
</style>
