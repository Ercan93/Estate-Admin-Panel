<template>
  <div id="appointments">
    <div class="d-flex flex-column align-items-center">
      <h1 class="display-4">Appointments</h1>
      <div class="col-11 d-flex flex-column flex-md-row align-items-center justify-content-between">
        <!-- Date Range Calendar Component -->
        <div
          class="d-flex flex-column flex-md-row align-items-center my-4"
        >
          <p class="mr-3 mb-0 h5">Filter Date Range:</p>
          <vc-date-picker class="my-3" v-model="range" is-range>
            <template v-slot="{ inputValue, inputEvents }">
              <div class="flex justify-center items-center">
                <input :value="inputValue.start" v-on="inputEvents.start" />
              </div>
            </template>
          </vc-date-picker>
          <div>
            <button class="ml-3 btn btn-success" @click="setDateRangeFilter">
              Set
            </button>
            <button class="ml-3 btn btn-outline-danger" @click="filterClear('date')">
              Clear
            </button>
          </div>
        </div>
        <!-- End of Date Range Calendar Component -->

        <!-- Employee Filter Component -->
        <div
          class="d-flex flex-column flex-md-row align-items-center my-4"
        >
          <p class="mb-0 h5 mr-4">Filter Employee:</p>
          <b-form-select
            class="my-4"
            v-model="selectedEmployee"
            :options="employees"
          ></b-form-select>
          <div class="d-flex">
            <button class="ml-3 btn btn-success" @click="setEmployeeFilter">
              Set
            </button>
            <button class="ml-3 btn btn-outline-danger" @click="filterClear('employee')">
              Clear
            </button>
          </div>
        </div>
        <!-- End of Employee Filter Component -->
      </div>
      <!-- Quick Search Component -->
      <div class="col-10 d-flex flex-column flex-md-row align-items-center justify-content-center mb-4">
        <p class="mb-0 h4 mr-4">Search:</p>
        <b-form-input
          class="col-8 py-2"
          type="text"
          @input="onQuickFilterChanged()"
          id="quickFilter"
          placeholder="client name, appointment day or anything.."
        ></b-form-input>
      </div>
      <!-- End of Quick Search Component -->

      <!-- Appointments Table Component -->
      <div class="col-12 mb-4">
        <ag-grid-vue
          style="height: 500px"
          class="ag-theme-alpine"
          :enableCharts="true"
          :animateRows="true"
          rowSelection="single"
          @grid-ready="onGridReady"
          :columnDefs="columnDefs"
          :rowData="rowData"
          @selection-changed="onSelectionChanged"
        >
        </ag-grid-vue>
      </div>
      <!-- Appointments Table Component -->
    </div>
  </div>
</template>
<script>
import { AgGridVue } from 'ag-grid-vue'
import { mapActions } from 'vuex'
export default {
  name: 'Appointments',
  data () {
    return {
      columnDefs: null,
      rowData: [],
      records: null,
      gridApi: null,
      columnApi: null,
      dateFilterParams: null,
      employeeFilterParams: null,
      range: {
        start: new Date(),
        end: new Date()
      },
      employees: [
        { value: 'Jason D.', text: 'Jason D.' },
        { value: 'Micheal F.', text: 'Micheal F.' },
        { value: 'Anna B.', text: 'Anna B.' },
        { value: 'Tommy K.', text: 'Tommy K.' }
      ],
      selectedEmployee: null
    }
  },
  components: {
    AgGridVue
  },
  beforeMount () {
    // <------------ Define Grid column Value ------------>
    this.columnDefs = [
      { field: 'id' },
      { field: 'name', sortable: true },
      { field: 'address', sortable: true },
      {
        field: 'date',
        filter: 'agDateColumnFilter',
        filterParams: this.dateFilterParams,
        suppressMenu: true
      },
      { field: 'time' },
      {
        field: 'employee',
        filter: 'agTextColumnFilter',
        filterParams: this.employeeFilterParams,
        suppressMenu: true
      },
      { field: 'email', sortable: true },
      { field: 'phone' },
      { field: 'duration', sortable: true },
      { field: 'distance' }
    ]
    // <------------ End of Define Grid column Value ------------>

    // call setRowData for get appointments data from API
    this.setRowData()
  },
  created () {
    this.dateFilterParams = {
      comparator: function (filterLocalDateAtMidnight, cellValue) {
        var dateAsString = cellValue
        if (dateAsString == null) return -1
        var dateParts = dateAsString.split('/')
        var cellDate = new Date(
          Number(dateParts[2]),
          Number(dateParts[1]) - 1,
          Number(dateParts[0])
        )
        if (cellDate >= filterLocalDateAtMidnight) {
          return 1
        }
        if (cellDate < filterLocalDateAtMidnight) {
          return -1
        }
      },
      browserDatePicker: true
    }
    this.employeeFilterParams = {
      textCustomComparator: function (filter, value, filterText) {
        const cellValue = value.toString()
        if (filter === 'equals') {
          return cellValue === filterText
        } else {
          return -1
        }
      }
    }
  },
  methods: {
    ...mapActions(['setAppointment']),

    // standard AgGrid definition
    onGridReady (params) {
      this.gridApi = params.api
      this.gridColumnApi = params.columnApi
    },

    /**
     * @description quickly filters the table.
     */
    onQuickFilterChanged () {
      this.gridApi.setQuickFilter(document.getElementById('quickFilter').value)
    },

    /**
     * @description It removes that filter from
     * the table according to the filteredColumn parameter.
     * @param {String} filteredColumn - any column name
     */
    filterClear (filteredColumn) {
      var filteredComponent = this.gridApi.getFilterInstance(filteredColumn)
      filteredComponent.setModel(null)
      this.gridApi.onFilterChanged()
    },

    /**
     * @description Filters the table based on the selected employee name.
     */
    setEmployeeFilter () {
      var employeeFilterComponent = this.gridApi.getFilterInstance('employee')
      const employeeName = this.selectedEmployee
      employeeFilterComponent.setModel({ type: 'equals', filter: employeeName })
      this.gridApi.onFilterChanged()
    },

    /**
     * @description Applies date filtering to the table
     * by editing the date layout.
     */
    setDateRangeFilter () {
      const range = this.range
      const endDate = `${range.end.getFullYear()}-${
        range.end.getMonth() + 1
      }-${range.end.getDate()}`

      const startDate = `${range.start.getFullYear()}-${
        range.start.getMonth() + 1
      }-${range.start.getDate()}`

      var dateFilterComponent = this.gridApi.getFilterInstance('date')
      dateFilterComponent.setModel({
        condition1: {
          type: 'lessThan',
          dateFrom: endDate,
          dateTo: null
        },
        operator: 'AND',
        condition2: {
          type: 'greaterThan',
          dateFrom: startDate,
          dateTo: null
        }
      })
      this.gridApi.onFilterChanged()
    },

    /**
     * @description redirects to the update page to edit
     * the selected appointment.
     */
    onSelectionChanged () {
      const selectedRows = this.gridApi.getSelectedRows()
      // sends the data to be updated to the store
      this.setAppointment(selectedRows[0])
      setTimeout(() => {
        this.$router.push('/UpdateAppointment')
      }, 500)
    },

    /**
     * @description get appointments data from Airtable server with API
     * and ad to agGrid table
     */
    setRowData () {
      const vm = this
      this.base('Appointments')
        .select({ view: 'Grid view' })
        .eachPage(
          function page (records, fetchNextPage) {
            records.forEach(function (record) {
              // add record to AgGrid table in order
              vm.rowData.push({
                id: record.id,
                name: record.fields.name,
                address: record.fields.address,
                date: record.fields.date,
                time: record.fields.time,
                employee: record.fields.employee,
                email: record.fields.email,
                phone: record.fields.phone,
                duration: record.fields.duration,
                distance: record.fields.distance
              })
            })
            // If there are no more records, `done` will get called.
            fetchNextPage()
          },
          function done (err) {
            if (err) {
              console.error(err)
            }
          }
        )
    }
  }
}
</script>

<style lang="scss">
@import "~ag-grid-community/dist/styles/ag-grid.css";
@import "~ag-grid-community/dist/styles/ag-theme-alpine.css";
</style>
