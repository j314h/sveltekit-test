<script type="ts">
  import { constNotification } from './notification.const';
  import { firstToUppperCase } from '$lib/providers/format/format.service';
  import { notificationStore } from './notification.store';
</script>

<!-- si il esiste une notification dans le tableau -->
{#if $notificationStore.length > 0}
  <section
    class="alert rounded-lg bg-base-100 border-2 border-indigo-600 fixed top-10 right-8 w-10/12 sm:w-5/12 md:w-4/12 xl:w-3/12 z-50"
  >
    <!-- parcourir le tableau de notification -->
    {#each $notificationStore as notification}
      <div class="flex flex-col w-full">
        <!-- boutton supprimer notification -->
        <div class="ml-auto mb-4">
          <button
            class="btn btn-circle btn-sm sm:btn-md text-primary bg-slate-100 border-none hover:bg-slate-300 "
            on:click={() => notificationStore.removeNotification(notification)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- titre notif + logo -->
        <div class="flex justify-start items-center">
          <!-- icone cloche -->
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#009688"
              class="flex-shrink-0 w-6 h-6 mx-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
          <div class="">
            <!-- titre -->
            <p class="font-bold">
              <span class="mr-3">{constNotification.title_notification}</span>
            </p>
          </div>
        </div>

        <!-- text de la notification -->
        <div class="p-4">
          <p class="text-sm">{firstToUppperCase(notification)}</p>
        </div>
      </div>
    {/each}
  </section>
{/if}
