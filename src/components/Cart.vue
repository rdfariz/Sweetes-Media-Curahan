<template>
<div>

  <v-container grid-list-xs fluid>
        <v-layout row wrap justify-center>

            <v-flex xs12 md12 v-if="shopping_cart.length != 0">
                <v-layout row wrap>

                    <v-flex xs12 sm12 md12 lg7 pa-1>
                        <v-card ref="form">
                            <v-app-bar dark color="pink" :src="$store.state.bgImage.src">
                              <v-toolbar-title>Delivered to</v-toolbar-title>
                              <div class="flex-grow-1"></div>
                              <v-btn icon>
                                  <v-icon>refresh</v-icon>
                              </v-btn>                            
                            </v-app-bar>

                            <v-card-text>
                            <v-text-field
                                ref="name"
                                v-model="name"
                                :rules="[() => !!name || 'This field is required']"
                                :error-messages="errorMessages"
                                label="Full Name"
                                placeholder="John Doe"
                                required
                            ></v-text-field>
                            <v-text-field
                                ref="address"
                                v-model="address"
                                :rules="[
                                () => !!address || 'This field is required',
                                () => !!address && address.length <= 25 || 'Address must be less than 25 characters',
                                addressCheck
                                ]"
                                label="Address Line"
                                placeholder="Snowy Rock Pl"
                                counter="25"
                                required
                            ></v-text-field>
                            <v-text-field
                                ref="city"
                                v-model="city"
                                :rules="[() => !!city || 'This field is required', addressCheck]"
                                label="City"
                                placeholder="El Paso"
                                required
                            ></v-text-field>
                            <v-text-field
                                ref="state"
                                v-model="state"
                                :rules="[() => !!state || 'This field is required']"
                                label="State/Province/Region"
                                required
                                placeholder="TX"
                            ></v-text-field>
                            <v-text-field
                                ref="zip"
                                v-model="zip"
                                :rules="[() => !!zip || 'This field is required']"
                                label="ZIP / Postal Code"
                                required
                                placeholder="79938"
                            ></v-text-field>
                            <v-autocomplete
                                ref="country"
                                v-model="country"
                                :rules="[() => !!country || 'This field is required']"
                                :items="countries"
                                label="Country"
                                placeholder="Select..."
                                required
                            ></v-autocomplete>
                            </v-card-text>
                            
                        </v-card>
                    </v-flex>

                    <v-flex xs12 sm12 md12 lg5 pa-1>

                        <v-card>

                          <v-app-bar dark color="pink" style="padding: 0 16px 0px 0 !important" :src="$store.state.bgImage.src">
                            <v-toolbar-title>List Cart</v-toolbar-title>
                            <div class="flex-grow-1"></div>
                            <v-btn icon to="shop">
                                <v-icon>add</v-icon>
                            </v-btn>                            
                          </v-app-bar>

                          <v-list two-line subheader class="area-sm ps" style="max-height: 300px">
                            <perfect-scrollbar>

                              <v-list-item v-for="(item, index) in shopping_cart" :key="index" @click="">
                                  <v-list-item-avatar>
                                      <v-icon :class="item.iconClass">{{item.icon}}</v-icon>
                                  </v-list-item-avatar>

                                  <v-list-item-content>
                                  <v-list-item-title v-text="item.title"></v-list-item-title>
                                  <v-list-item-subtitle v-text="`Rp. `+item.price"></v-list-item-subtitle>
                                  </v-list-item-content>

                                  <v-list-item-action>
                                  <v-btn icon @click="deleteItem(item)">
                                      <v-icon>delete</v-icon>
                                  </v-btn>
                                  </v-list-item-action>
                              </v-list-item>

                            </perfect-scrollbar>
                          </v-list>

                          <v-list>
                            <v-list-item>
                                <v-list-item-avatar>
                                <v-icon
                                >attach_money</v-icon>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                <v-list-item-title>Total</v-list-item-title>
                                <v-list-item-subtitle v-text="`Rp. `+priceAll"></v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>
                                <v-btn icon>
                                    <v-icon>info</v-icon>
                                </v-btn>
                                </v-list-item-action>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-avatar>
                              
                                </v-list-item-avatar>

                                <v-list-item-content>
                                
                                </v-list-item-content>

                                <v-list-item-action>
                                  <v-btn color="primary" @click="submit">Submit</v-btn>
                                </v-list-item-action>
                            </v-list-item>
                          </v-list>
                            
                        </v-card>
                    </v-flex>

                </v-layout>
            </v-flex>

            <v-flex xs12 text-center mt-5 v-else>
              <p>Belum ada barang yang ditambahkan<br><br></p>
              <notfound/>
            </v-flex>

            

        </v-layout>

    </v-container>
</div>
</template>

<script>
import {firebase, firestore} from '../firebase'
import NotFound from './NotFound'

export default {
    data: () => ({
        countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', "Timor L'Este", 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'],
        errorMessages: '',
        name: null,
        address: null,
        city: null,
        state: null,
        zip: null,
        country: null,
        formHasErrors: false,
    }),
    components: {
      'notfound': NotFound
    },
    computed: {
      form () {
        return {
          name: this.name,
          address: this.address,
          city: this.city,
          state: this.state,
          zip: this.zip,
          country: this.country,
        }
      },
      shopping_cart(){
          return this.$store.state.shopping_cart;
      },
      priceAll(){
          return this.$store.state.priceAll;
      }
    },
    watch: {
      name () {
        this.errorMessages = ''
      },
    },
    methods: {
      addToCart(newData){
        this.$store.commit('addToCart', newData);
      },
      deleteItem(data){
        this.$store.commit('deleteItem', data);
      },
      addressCheck () {
        this.errorMessages = this.address && !this.name
          ? 'Hey! I\'m required'
          : ''

        return true
      },
      resetForm () {
        this.errorMessages = []
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })
      },
      submit () {
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          if (!this.form[f]){
            this.formHasErrors = true
            this.$refs[f].validate(true)
          }else {
            this.$swal({
              title: 'Are you sure?',
              text: 'Want to submit this order',
              type: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes continue!',
              cancelButtonText: 'Cancel',
              showCloseButton: true,
              showLoaderOnConfirm: true
            }).then((result) => {
              if(result.value) {
                this.$swal('Success', 'You successfully submit the order', 'success')
              } else {
                this.$swal('Cancelled', 'Your action was cancelled', 'info')
              }
            })
          }
        })
      },
    }
  }
</script>