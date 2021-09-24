<template>
  <div class="checkout">
    <section class="col-75">
      <b-field label="Receiver Name" horizontal>
        <b-input v-model="order.owner_name"></b-input>
      </b-field>
      <b-field label="Phone" horizontal>
        <b-input  v-model="order.receive_phone" maxlength="30"></b-input>
      </b-field>
      <b-field label="Shipping Method" horizontal>
        <b-input v-model="order.shipping_method" type="text"> </b-input>
      </b-field>
      <b-field label="Shipping Address" horizontal>
        <b-input v-model="order.receive_address" type="text"> </b-input>
      </b-field>

      <b-field label="Note" horizontal>
        <b-input v-model="order.note" maxlength="200" type="textarea"></b-input>
      </b-field>
      <b-field horizontal>
        <b-button
          @click="checkOut"
          value="Continue to checkout"
          :disabled="!totalP"
          class="btn"
          >Checkout
        </b-button>
      </b-field>
      <div v-show="isPaying">
        <b-field label="Select Payment Method" horizontal>
          <b-button @click="Card" :class="{ selected: isCard }" expanded
            >Card
          </b-button>
          <b-button @click="Paypal" :class="{ selected: isPaypal }" expanded
            >Paypal</b-button
          >
        </b-field>
      </div>
    </section>
    <div >
      <div class="col-25">
        <div class="container">
          <h4>
            <label class="label"
              >Cart
              <span class="price" style="color: black">
                <i class="fa fa-shopping-cart"> </i>
                <b> {{ totalQ }}</b>
              </span></label
            >
          </h4>
          <div v-for="p in cart" :key="p.product_id">
            <div class="labels">
              <label class="label">{{ p.name }}</label>
              <label class="label">{{ p.price | currency }} </label>
            </div>
            <b-numberinput :disabled="isPaying" :min="0" v-model="p.quantity"></b-numberinput>
          </div>
          <hr />
          <p>
            Total
            <span class="price" style="color: black"
              ><b>{{ totalP | currency }} </b></span
            >
          </p>
        </div>
      </div>
    </div>

    <div v-if="isPaying" class="payment-method">
      <form v-show="isCard" id="payment-form">
        <div id="cardElement">
          <!--Stripe.js injects the Card Element-->
        </div>
        <button @click.prevent="payStripe" id="submit">
          <div class="spinner hidden" id="spinner"></div>

          <span id="button-text">Pay now</span>
        </button>
      </form>
      <div v-show="isPaypal" id="paypalContainer"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { loadScript } from "@paypal/paypal-js";
export default {
  data() {
    return {
      stripe: null,
      elements: null,
      card: null,
      clientSecret: null,
      isPaying: false,
      isCard: false,
      isPaypal: false,
      isSuccess: null,
      order: {
        user_id: this.user_id,
        total_price: null,
        shipping_method: "",
        receive_address: "",
        receive_phone: "",
        note: "",
        pay_method: null,
        number_cart: "1",
        owner_name: "",
        items: [],
      },
      order_Paypal: {
        purchase_units: [
          {
            amount: {
              value: "",
              currency_code: "USD",
              breakdown: {
                item_total : {
                  value : "",
                  currency_code : "USD"
                }
              }
            },
            items : [
            ],
            description: ""
          },
        ],
      },
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.authen.isAuthenticated;
    },
    user() {
      return this.$store.state.authen.user;
    },
    cart() {
      return this.$store.state.cart.cart;
    },
    totalQ() {
      try {
        return this.cart.reduce((a, b) => a + b.quantity, 0);
      } catch (err) {
        return 0.0;
      }
    },
    totalP() {
      try {
        return this.cart.reduce((a, b) => a + b.price.toFixed(2) * b.quantity, 0);
      } catch (err) {
        return 0.0;
      }
    },
        validate() {
      if (this.order.owner_name && this.order.receive_phone && this.order.shipping_method && this.order.receive_address) {
        return true
      }
      return false;
    },
  },
  methods: {
    notification(message, err) {
      let type = "";
      if (err) {
        type = "is-danger";
      } else {
        type = "is-success";
      }
      this.$buefy.notification.open({
        duration: 5000,
        message: message,
        position: "is-top",
        type: type,
        hasIcon: true,
      });
    },
    Card() {
      if (this.isCard === true) {
        this.isCard = false;
      } else {
        this.isCard = true;
        this.isPaypal = false;
      }
      console.log(this.isCard)
      this.elements = this.stripe.elements();
      let style = {
        base: {
          color: "#32325d",
          padding: "0.12em",
          marginBottom: "0.05em",
          fontFamily: "Arial, sans-serif",
          fontSmoothing: "antialiased",
          fontSize: "18px",
          "::placeholder": {
            color: "#32325d",
          },
          border: "  border: 10px black",
        },
        invalid: {
          fontFamily: "Arial, sans-serif",
          color: "#fa755a",
          iconColor: "#fa755a",
        },
      };

      this.card = this.elements.create("card", { style: style });
      this.card.mount("#cardElement");
    },
    Paypal() {
      if (this.isPaypal === true) {
        this.isPaypal = false;
      } else {
        this.isPaypal = true;
        this.isCard = false;
      }
      this.payPal();
    },
    checkOut() {
      if (!this.validate) {
        this.notification("Enter valid info", true);
        return;
      }
      this.isPaying = true;
      let order = this.order;
      order.total_price = this.totalP.toFixed(2) * 100;
      order.user_id = this.$store.state.authen.user.user_id;
      for (let i of this.cart) {
        let item = {};
        item.product_id = i.product_id;
        item.unit_price = i.price;
        item.amount = i.quantity;
        item.name = i.name
        item.image_url = i.image_url
        order.items.push(item);
      }
      this.order = order;
    },
    async payStripe() {
      this.order.pay_method =  "Card"

      if (!this.stripe) {
        this.stripe = await window.Stripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
      }
      try {
        let totalPrice = this.totalP.toFixed(2) * 100;
        let reqJson = JSON.stringify({ revenue: totalPrice });
        let token = localStorage.getItem("id_token")
        let request = axios.create({
                        headers: { "Authorization": `Bearer ${token}` }
                    })
        let response = await request.post(
          "http:///localhost:9000/create-payment-intent",
          reqJson
        );
        this.clientSecret = response.data.clientSecret;
      } catch (err) {
        this.notification("Your cart is empty", true);
      }

      let response = await this.stripe.confirmCardPayment(this.clientSecret, {
        payment_method: {
          card: this.card,
        },
      });
      if (response.error) {
        this.notification(response.error.message, true);
      } else if (response.paymentIntent.status === "succeeded") {
        this.notification(
          "Check your email to verify your order! Payment succedd. Redirecting to Order",
          false
        );
        await this.$store.dispatch("postOrder", this.order);
        this.$store.commit("CLEAR_CART");
        this.$router.push("/account");
      }
    },
    async payPal() {
      this.order.pay_method =  "Paypal"
      this.order_Paypal.purchase_units[0].amount.value = String(this.totalP.toFixed(2))
      this.order_Paypal.purchase_units[0].amount.breakdown.item_total.value = String(this.totalP.toFixed(2))
      this.order_Paypal.purchase_units[0].description = this.order.note
      for (let p of this.cart) {
        let item = {}
        item.name = p.name
        item.unit_amount = {}
        item.unit_amount.value = String(p.price.toFixed(2))
        item.unit_amount.currency_code = "USD"
        item.quantity = p.quantity
        this.order_Paypal.purchase_units[0].items.push(item) 

      }

      window.paypalContainer.innerHTML = "";
      let paypal = await loadScript({
        "client-id":
          "AeRvHg1_4cNhTfCXdXs2kH-9rA2LY15t98Gf0zfi01Cmoa6vzpKb5oMIFmcdFgLC2Y0dZbf_ra11pxEL",
      });
      let order = this.order_Paypal
      paypal
        .Buttons({
          createOrder: (data, actions) => {
            // Set up the transaction
            return actions.order.create(order);
          },
          onApprove: async () => {
            this.notification(
              "You have successfully done, redirecting to order details ",
              false
            );
            await this.$store.dispatch("postOrder", this.order);
            this.$store.commit("CLEAR_CART");
            this.$router.push("/account");
          },
          onError: (err) => {
            this.notification(err, false);
          },
        })
        .render("#paypalContainer");
    },
  },
  async mounted() {
    if (!this.totalP) {
      this.notification("Your cart is empty", true);
      return;
      
    }
        this.stripe = await window.Stripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

  },
  watch: {
    cart: {
      handler: function (value) {
        this.$store.commit("SET_CART", value);
      },
      deep: true,
    },
    isAuthenticated(value) {
      if (!value) {
        this.$router.push("/login");
      }
    },
  },
  created() {
    if (!this.$store.state.authen.isAuthenticated) {
      this.notification("Please login first", true);
      this.$router.push("/login");
    }

  },
};
</script>

<style scoped>
.checkout {
  display: grid;
  grid-template-rows: repeat(autofit);
  grid-template-columns: 1.5fr 1fr;
}

.payment-method {
  grid-column: 1;
  margin: auto;
  min-width: 30rem;
}
.col-25 {
  grid-row: 1;
  grid-column: 2;
}

.col-75 {
  grid-row: 1 / 5;
  grid-column: 1;
  display: flex;
  flex-direction: column;
}

#payment-form {
  margin-top: 1em;
  padding: 1em;
  grid-row: 2;
  grid-column: 2;
}

#button-text {
  padding: 1em;
  margin-top: 3em;
  font-size: 1.5em;
}

.selected {
  background-color: #f5f5dc;
}

.col-25 {
  padding: 0 1em;
}

.container {
  background-color: #f2f2f2;
  padding: 5px 20px 15px 20px;
  border: 1px solid lightgrey;
  border-radius: 3px;
}

input[type="text"] {
  width: 100%;
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

label {
  margin-bottom: 10px;
  display: block;
}

.btn {
  grid-row: 4;
  background-color: #04aa6d;
  color: rgb(255, 255, 255);
  padding: 12px;
  margin: auto;
  border: none;
  width: 10em;
  border-radius: 3px;
  cursor: pointer;
  font-size: 17px;
  align-items: center;
}

.btn:hover {
  background-color: #45a049;
}

span.price {
  float: right;
  color: grey;
}

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other (and change the direction - make the "cart" column go on top) */
@media (max-width: 800px) {
  .row {
    flex-direction: column-reverse;
  }
  .col-25 {
    margin-bottom: 20px;
  }
}
.labels {
  display: flex;
  align-items: space-between;
  align-content: space-between;
  justify-content: space-between;
}
.label {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  font-size: 1.1rem;
}
</style>