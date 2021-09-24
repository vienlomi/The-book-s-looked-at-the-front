<template>
  <div class="home">
    <div class="side-bar">
      <button @click="show">Account Infor</button>
      <button @click="show">Order</button>
    </div>
    <div v-show="isShow" class="main">
      <form>
        <div class="user-name">
          <label> User information goes here</label>
        </div>
        <div class="main-item">
          <label> First Name</label>
          <input v-model="user.first_name" type="text" />
        </div>

        <div class="main-item">
          <label> Last Name</label>
          <input v-model="user.last_name" type="text" />
        </div>
        <div class="main-item">
          <label> Phone</label>
          <input v-model="user.phone" type="text" />
        </div>

        <div class="main-item">
          <label> Birthdate</label>
          <input v-model="user.birthday" type="date" />
        </div>

        <div class="main-item">
          <label> Gener</label>
          <select v-model="user.sex">
            <option>M</option>
            <option>F</option>
          </select>
        </div>

        <div class="main-item">
          <label> Address</label>
          <input v-model="user.address" type="text" />
        </div>
        <div class="main-item">
          <button @click.prevent="updateBio">Update</button>
        </div>
      </form>
      <h1><b-button>Change Password</b-button></h1>
    </div>

    <div v-show="!isShow" class="order">
    <div class="search-bar"> <input class="search-items" v-model="startDate" type="date">
    <input class="search-items" v-model="endDate" type="date">
    <button class="search-items" @click="search"> Search </button>
      </div>

      <div v-for="order in orderList" :key="order.order_id">
        <h1 class="order-detail"> <span> Date: {{order.created_at}} </span> Total Price: {{order.total_price | curCy}}</h1>
        <div v-for="i in order.items" :key="i.product_id">
        <div order-img-container class="order-detail2">
          <img :src="i.image_url" alt="" class="order-img order-1-img" />
          <p class="order-price">{{ i.name }}</p>
          <p class="order-price">{{ i.amount }}</p>
          <p class="order-price">x</p>
          <p class="order-price">{{ i.unit_price | currency }}</p>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      isShow: false,
      v: 0,
      orderId: null,
      endDate : Date.now(),
      startDate: Date.now(),
      s : 0,
      e : Date.now(),
      pageSize : 2,
      currentPage : 1,
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.authen.isAuthenticated;
    },
    initList() {
      return this.$store.state.authen.orderList;
    },
    orderCount() {
      return this.initList.length
    },
    orderList() {
      let s = this.s
      let e = this.e
      return this.initList.filter((p) => {
        console.log(Date.parse(p.created_at.split(" ")[0]))
        console.log(s)
        console.log(e)
        let time = Date.parse(p.created_at.split(" ")[0])
        return (time >= s) && (time <= e)
      }
      )
    },
    pageList() {
      let index = (this.currentPage - 1) * this.pageSize()
      return this.orderList[index, index + this.pageSize]
    }

  },
  methods: {
    show() {
      this.isShow = !this.isShow;
    },
    updateBio() {
      this.$store.dispatch("updateBio", this.user);
      this.$buefy.notification.open({
        duration: 5000,
        message: "Updated",
        position: "is-top",
        type: "is-success",
        hasIcon: true,
      })
    },
    search() {
      this.s = Date.parse(this.startDate)
      this.e = Date.parse(this.endDate)
    }
  },
  filters: {
    curCy(value) {
      return String(value / 100) + " USD"
    }
  },
  watch: {
    isAuthenticated(value) {
      if (!value) {
        this.$router.push("/login");
      }
    },
    startDate() {
      console.log(this.starDate)
      console.log(this.endDate)
    },
    endDate() {
      console.log(this.endDate)
            console.log(this.starDate)

    }
  },
  async created() {
    await this.$store.dispatch("getOrder");
    this.user = this.$store.state.authen.user
    let id = new Set();
    for (let i of this.initList) {
      id.add(i.orderId);
    }
    this.orderId = [...id];
    this.v = this.orderId[0];
  },

};
</script>

<style scoped>
.home {
  display: grid;
  grid-template-columns: 1fr 4fr;
  background: #f7f7f7;
  font-family: sans-serif;
}
.search-bar {
  font-size: 20px;
  padding: 1em 0;
  
}
.search-items {
  margin: 5px;
  font-size: 20px;
}
h1 {
  font-size: 1rem;
  margin: 0.5em;
}

.side-bar {
  display: flex;
  flex-direction: column;
  margin: 2em;
  padding: 0.75em 0;
}

.order-detail2 {
  display: grid;
  grid-template-columns: 1fr 1.7fr 0.6fr 0.6fr 1fr;
  padding: 0;
  gap: 1em;

}

.side-bar button {
  margin: 0.5em 0;
  background: none;
  border: none;
  text-align: left;
  font-size: 1rem;
}

.side-bar button:hover {
  color: #f54900;
}

.main {
  background-color: white;
  display: flex;
  flex-direction: column;
  margin: 2em;
  padding: 2em;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);
}

.main form {
  display: flex;
  flex-direction: column;
}

.user-name {
  margin: 0.5em 0 1.5em 0;
}

.main-item {
  margin: 0.75em;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.main-item label {
  display: block;
  width: 20%;
}

.main-item button {
  padding: 0.5em;
  font-size: 16px;
  margin-left: auto;
  background-color: white;
  border-radius: 10px;
}

.main-item input {
  height: 2rem;
  width: 80%;
  border: 1px solid #cccccc;
}

.main h1 {
  margin: 2em 0.5em;
}

.order {
  background-color: white;
  grid-template-columns: 1fr 3fr 1.5fr;
  margin: 2em;
  padding: 2em;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);
}

.order h1 {
  margin: 0 0 1em 0;
}

.order-img {
  width: 10rem;
  height: 10rem;
  object-fit: cover;
}

.order-detail {
  margin: 2em 0;
  padding: 1em 0;
  color: rgb(114, 93, 93);
  font-size: 20px;

}

.order li {
  list-style: none;
}

.order-price {
  font-size: 1.3rem;
  color: rgb(255, 0, 157);
  margin-top: 1em;
  margin-bottom: 1em;
  padding: 1em 0;
}
</style>
