<template>
<div>

      <v-container grid-list-xs fluid>
            <v-layout row wrap justify-center>

                <v-flex xs12 md12>
                    <v-card>      

                        <v-card-title>
                            <v-dialog v-model="dialog" max-width="500px">
                                <template v-slot:activator="{ on }">
                                    <v-btn color="primary" dark class="ma-1" v-on="on">New Item</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                    <v-container>
                                        <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                                        </v-col>
                                        </v-row>
                                    </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                    <div class="flex-grow-1"></div>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            
                            <v-dialog
                            v-if="desserts.length > 0"
                            v-model="dialogClear"
                            max-width="290"
                            >
                            <template v-slot:activator="{ on }">
                                <v-btn color="red" dark class="ma-1" v-on="on">Clear All</v-btn>
                            </template>
                            <v-card>
                                <v-card-title class="headline">Are you sure want to Clear all data?</v-card-title>

                                <v-card-text>
                                This action can't be undo
                                </v-card-text>

                                <v-card-actions>
                                <div class="flex-grow-1"></div>

                                <v-btn
                                    color="green darken-1"
                                    text
                                    @click="dialogClear = false"
                                >
                                    Disagree
                                </v-btn>

                                <v-btn
                                    color="green darken-1"
                                    text
                                    @click="clearData()"
                                >
                                    Agree
                                </v-btn>
                                </v-card-actions>
                            </v-card>
                            </v-dialog>

                            <v-btn color="success" v-if="desserts.length == 0" class="ma-1" @click="initialize">Reset</v-btn>

                        </v-card-title>

                        <v-divider/>

                        <v-data-table
                            :headers="headers"
                            :items="desserts"
                            sort-by="calories"
                            :search="search"
                            class="elevation-1"
                        >
                            <template v-slot:top>
                            <v-toolbar flat>
                                <v-toolbar-title>Simple CRUD</v-toolbar-title>
                                <v-divider
                                class="mx-4"
                                inset
                                vertical
                                ></v-divider>
                                
                                <div class="flex-grow-1"></div>
                                <v-text-field
                                    v-model="search"
                                    append-icon="search"
                                    label="Search"
                                    single-line
                                    hide-details
                                ></v-text-field>
                            </v-toolbar>
                            </template>
                            <template v-slot:item.action="{ item }">
                            <v-icon
                                small
                                class="mr-2"
                                @click="editItem(item)"
                            >
                                edit
                            </v-icon>
                            <v-icon
                                small
                                @click="deleteItem(item)"
                            >
                                delete
                            </v-icon>
                            </template>
                            <template v-slot:no-data>
                                <p>No data found</p>
                            </template>
                        </v-data-table>

                    </v-card>
                </v-flex>

            </v-layout>

        </v-container>

</div>
</template>

<script>
import {firebase, firestore} from '../firebase'
import router from '../router'
import moment from 'moment'

  export default {
    data: () => ({
      dialog: false,
      dialogClear: false,
      search: '',
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
        clearData () {
            this.dialogClear = false;
            this.desserts = [];
        },
      initialize () {
        this.desserts = [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>

<style>
.profile {
  position: absolute;
  z-index: 1;
}
</style>