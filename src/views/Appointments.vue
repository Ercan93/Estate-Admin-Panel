<template>
  <div id="appointments">
    <div>
      <h1>Appointments</h1>
      <div class="col-11 d-flex align-items-center my-4">
        <p class="mr-3 mb-0 h4">Select Date Range:</p>
        <vc-date-picker v-model="range" is-range>
          <template v-slot="{ inputValue, inputEvents }">
            <div class="flex justify-center items-center">
              <input :value="inputValue.start" v-on="inputEvents.start" />
            </div>
          </template>
        </vc-date-picker>
        <button class="ml-3 btn btn-success" @click="setDateRange">Set</button>
        <button class="ml-3 btn btn-outline-danger" @click="clearDateRange">
          Clear
        </button>
      </div>

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
      dateFilterParams: null,
      range: {
        start: new Date(),
        end: new Date(),
      },
    };
  },
  components: {
    AgGridVue,
  },
  beforeMount() {
    this.columnDefs = [
      { field: "name", sortable: true, filter: true },
      { field: "address", sortable: true, filter: true },
      {
        field: "date",
        sortable: true,
        filter: "agDateColumnFilter",
        filterParams: this.dateFilterParams,
        suppressMenu: true,
      },
      { field: "time", sortable: true, filter: true },
      { field: "employee", sortable: true, filter: true },
      { field: "email", sortable: true, filter: true },
      { field: "phone", filter: true },
      { field: "duration", sortable: true, filter: true },
      { field: "distance", sortable: true, filter: true },
    ];
    this.setRowData();
  },
  created() {
    this.dateFilterParams = {
      comparator: function (filterLocalDateAtMidnight, cellValue) {
        var dateAsString = cellValue;
        if (dateAsString == null) return -1;
        var dateParts = dateAsString.split("/");
        var cellDate = new Date(
          Number(dateParts[2]),
          Number(dateParts[1]) - 1,
          Number(dateParts[0])
        );
        if (cellDate >= filterLocalDateAtMidnight) {
          return 1;
        }
        if (cellDate < filterLocalDateAtMidnight) {
          return -1;
        }
      },
      browserDatePicker: true,
    };
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
    clearDateRange() {
      this.gridApi.setFilterModel(null);
    },
    setDateRange() {
      let range = this.range;
      let endDate = `${range.end.getFullYear()}-${
        range.end.getMonth() + 1
      }-${range.end.getDate()}`;

      let startDate = `${range.start.getFullYear()}-${
        range.start.getMonth() + 1
      }-${range.start.getDate()}`;

      var dateFilterComponent = this.gridApi.getFilterInstance("date");
      dateFilterComponent.setModel({
        condition1: {
          type: "lessThan",
          dateFrom: endDate,
          dateTo: null,
        },
        operator: "AND",
        condition2: {
          type: "greaterThan",
          dateFrom: startDate,
          dateTo: null,
        },
      });
      this.gridApi.onFilterChanged();
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
