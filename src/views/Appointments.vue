<template>
  <div id="appointments">
    <div>
      <h1>Appointments</h1>
      <div class="col-11">
        <ag-grid-vue
          style="height: 500px"
          class="ag-theme-alpine"
          :enableCharts="true"
          :animateRows="true"
          rowSelection="single"
          @grid-ready="onGridReady"
          :columnDefs="columnDefs"
          :rowData="rowData"
        >
        </ag-grid-vue>
      </div>
    </div>
  </div>
</template>
<script>
import { AgGridVue } from "ag-grid-vue";
export default {
  name: "Appointments",
  data() {
    return {
      columnDefs: null,
      rowData: [],
      records: null,
      gridApi: null,
      columnApi: null,
    };
  },
  components: {
    AgGridVue,
  },
  beforeMount() {
    this.columnDefs = [
      { field: "name", sortable: true, filter: true },
      { field: "address", sortable: true, filter: true },
      { field: "date", sortable: true },
      { field: "time", sortable: true, filter: true },
      { field: "employee", sortable: true, filter: true },
      { field: "email", sortable: true, filter: true },
      { field: "phone", filter: true },
      { field: "duration", sortable: true, filter: true },
      { field: "distance", sortable: true, filter: true },
    ];
    this.setRowData();
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
    setRowData() {
      let vm = this;
      this.base("Appointments")
        .select({ view: "Grid view" })
        .eachPage(
          function page(records, fetchNextPage) {
            records.forEach(function (record) {
              vm.rowData.push({
                name: record.fields.name,
                address: record.fields.address,
                date: record.fields.date,
                time: record.fields.time,
                employee: record.fields.employee,
                email: record.fields.email,
                phone: record.fields.phone,
                duration: record.fields.duration,
                distance: record.fields.distance,
              });
            });
            // If there are no more records, `done` will get called.
            fetchNextPage();
          },
          function done(err) {
            if (err) {
              console.error(err);
              return;
            }
          }
        );
    },
  },
};
</script>

<style lang="scss">
@import "~ag-grid-community/dist/styles/ag-grid.css";
@import "~ag-grid-community/dist/styles/ag-theme-alpine.css";
</style>
