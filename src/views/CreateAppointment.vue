<template>
    <div class="container d-flex flex-column align-items-center">
        <p class="col-8 display-4 mt-4">Yeni Bir Randevu Oluşturun</p>
         <div class="col-8">
            <b-form @submit="onSubmit" @reset="onReset">

            <b-form-group id="input-group-1" label="Müşteri Ad Soyad:" label-for="input-1">
                <b-form-input
                id="input-1"
                v-model="form.name"
                placeholder="Bruce Wayne"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-2"
                label="Email adresi:"
                label-for="input-2"
            >
                <b-form-input
                id="input-2"
                v-model="form.email"
                type="email"
                placeholder="bruce@wayne.com"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Çalışan:" label-for="input-3">
                <b-form-select
                id="input-3"
                v-model="form.user"
                :options="users"
                required
                ></b-form-select>
            </b-form-group>

            <b-form-group
                id="input-group-4"
                label="Telefon Numarası:"
                label-for="input-4"
            >
                <b-form-input
                id="input-4"
                v-model="form.phone"
                type="number"
                placeholder="7351857301"
                required
                ></b-form-input>
            </b-form-group>

            <div class="my-4">
              <p>Tarih ve Saat Seçin:</p>
              <vc-date-picker v-model="date" mode="dateTime">
                <template v-slot="{ inputValue, inputEvents }">
                  <input
                    class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
                    :value="inputValue"
                    v-on="inputEvents"
                    required
                  />
                </template>
              </vc-date-picker>
            </div>

            <b-button type="submit" class="mr-4 mb-4" variant="success">Radevuyu Tamamla</b-button>
            <b-button type="reset" class="mb-4" variant="outline-danger">Formu Temizle</b-button>
            </b-form>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          name: '',
          phone:null,
          user: null,
        },
        users: ['Jason D.', 'Micheal F.', 'Anna B.', 'Tommy K.'],
        date: new Date(),
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        console.log(JSON.stringify(this.form))
      },
      onReset(event) {
        event.preventDefault()
        this.form.email = ''
        this.form.name = ''
        this.form.phone = ''
        this.form.user = null
      }
    }
  }
</script>
