<script setup>
import { formatCurrency } from "../helpers";
import { useCartStore } from "../stores/cart";
import AmountVue from "./Amount.vue";
import ShoppingCartItemVue from "./ShoppingCartItem.vue";
import CouponForm from "./CouponForm.vue";
import { useCouponStore } from "../stores/coupons";

const cart = useCartStore();
const coupon = useCouponStore();
</script>

<template>
  <p v-if="cart.isEmpty" class="text-xl text-center text-gray-900">
    el carrito esta vacio
  </p>
  <div v-else>
    <p class="text-4xl font-bold text-gray-900">Resumen de venta</p>

    <ul role="list" class="mt-6 divide-y divide-gray-200">
      <ShoppingCartItemVue
        v-for="item in cart.items"
        :key="item.id"
        :item="item"
      />
    </ul>
    <dl
      class="space-y-6 border-gray-200 pt-6 text-sm font-medium text-gray-500"
    >
      <AmountVue>
        <template #label>Subtotal:</template>
        {{ formatCurrency(cart.subtotal) }}
      </AmountVue>
      <AmountVue>
        <template #label>Impuestos:</template>
        {{ formatCurrency(cart.taxes) }}
      </AmountVue>
      <AmountVue v-if="coupon.isValidCoupon">
        <template #label>Descuento:</template>
        {{ formatCurrency(coupon.discount) }}
      </AmountVue>
      <AmountVue>
        <template #label>Total a pagar:</template>
        {{ formatCurrency(cart.total) }}
      </AmountVue>
    </dl>
    <CouponForm />

    <button
      type="button"
      class="mt-10 w-full bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold p-3"
      @click="cart.checkout"
    >
      Confirmar compra
    </button>
  </div>
</template>


