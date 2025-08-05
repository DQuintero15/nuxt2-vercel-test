<template>
  <el-drawer
    :visible.sync="openOrder"
    :before-close="closedOrder"
    direction="rtl"
    :with-header="false"
    :modal-append-to-body="false"
    class="width-drawer"
    size="410px"
  >
    <div class="relative overflow-hidden">
      <div
        class="box-border flex h-dvh w-full flex-col items-center overflow-hidden bg-white-white px-15 pb-10 md:pb-20"
      >
        <div
          class="flex w-full items-center justify-between border-b border-[#ededed] py-15"
        >
          <h3 class="font-medium text-[#2c2930]">
            {{ $t('footer_title') }} ({{ cantidadProductos }})
          </h3>
          <div
            class="flex cursor-pointer items-center justify-center text-14 font-normal text-[#2c2930] underline transition-all duration-300 ease-in-out hover:text-[#a1a1a1]"
            @click="remove = !remove"
          >
            <cart-icon class="mr-5" />
            <p>
              {{ $t('footer_vaciarCarrito') }}
            </p>
          </div>
          <!-- <div
            class="group relative flex h-30 w-30 cursor-pointer items-center justify-center"
            @click="closedOrder"
          >
            <div
              class="absolute h-4 w-30 -rotate-45 transform rounded-2 bg-[#2c2930] transition-all duration-200 ease-in group-hover:rotate-0"
            ></div>
            <div
              class="absolute h-4 w-30 rotate-45 transform rounded-2 bg-[#2c2930] transition-all duration-200 ease-in group-hover:rotate-0"
            ></div>
          </div> -->
        </div>

        <div
          v-if="productsCart.length"
          class="grid h-full max-h-screen w-full grid-flow-row overflow-hidden"
        >
          <!-- list product -->
          <div class="w-full overflow-y-auto">
            <div
              class="flex w-full flex-col items-start justify-center overflow-x-hidden"
            >
              <div
                v-for="(product, index) in productsCart"
                :key="index"
                class="flex w-full max-w-[370px] items-start justify-between overflow-x-hidden border-b border-[#ededed] py-10"
              >
                <img
                  v-lazy="idCloudinary(product.foto_cloudinary, 150, 150)"
                  class="mt-5 max-h-[50px] max-w-[50px] rounded-5 object-cover"
                  width="50"
                  height="50"
                  alt="Product Img"
                />
                <div class="ml-5 flex w-full max-w-[190px] flex-col">
                  <p class="line-clamp-3 text-14 font-bold text-[#2c2930]">
                    {{ product.nombre | capitalize }}
                  </p>
                  <span v-if="product.precio">
                    <b class="text-12 font-normal text-[#2c2930]">
                      {{ $t('cart_cantidad') }} {{ product.cantidad }}
                    </b>
                    <b class="text-xs font-normal text-[#2c2930]">
                      X
                      {{
                        product.precio
                          | currency(
                            dataStore.tiendasInfo.paises.codigo,
                            dataStore.tiendasInfo.moneda
                          )
                      }}
                    </b>
                  </span>
                  <div
                    class="relative mb-5 flex w-full flex-col items-start justify-center"
                  >
                    <div
                      class="box-border grid w-full max-w-[100px] grid-cols-3 items-center rounded-5 border border-[#2c2930]"
                    >
                      <button
                        class="text-[#2c2930] hover:text-[#a1a1a1]"
                        @click="removeQuantity(product)"
                      >
                        <menos-icon />
                      </button>
                      <p class="text-center">
                        {{ product.cantidad }}
                      </p>
                      <button
                        class="text-[#2c2930] hover:text-[#a1a1a1]"
                        @click="addQuantity(product)"
                      >
                        <mas-icon />
                      </button>
                    </div>
                    <p
                      v-if="product.limitQuantity == product.cantidad"
                      class="absolute -right-[5px] top-0 rounded-5 border border-yellow-400 bg-yellow-300 px-5 py-3 text-center text-xs text-black"
                    >
                      {{ $t('cart_ultimaUnidad') }}
                    </p>
                  </div>
                  <div
                    v-if="product.combinacion"
                    class="mb-5 grid max-w-[190px] auto-cols-max grid-flow-col gap-[2px] overflow-x-auto"
                  >
                    <div
                      v-for="(
                        productCombinacion, index2
                      ) in product.combinacion"
                      :key="index2"
                      class="inline-flex items-center rounded-md bg-[#2c2930] px-3 py-1 text-xs font-medium text-white-white ring-1 ring-inset ring-[#2c2930]"
                    >
                      {{ productCombinacion | capitalize }}
                    </div>
                  </div>
                  <span
                    v-if="product.activo == 0"
                    class="mb-10 max-w-[110px] rounded-md bg-red-100 px-2 py-1 text-center text-xs font-medium text-red-700"
                  >
                    Producto agotado!
                  </span>
                  <span
                    v-if="product.stock_disponible == 0"
                    class="max-w-[120px] rounded-md bg-red-100 px-2 py-1 text-center text-xs font-medium text-red-700"
                  >
                    ¡Unidades agotadas!
                  </span>
                </div>

                <p
                  v-if="product.precio > 0"
                  class="w-full min-w-[60px] max-w-[100px] text-end font-normal text-[#2c2930]"
                >
                  {{
                    (product.precio * product.cantidad)
                      | currency(
                        dataStore.tiendasInfo.paises.codigo,
                        dataStore.tiendasInfo.moneda
                      )
                  }}
                </p>
                <div v-else class="w-full min-w-[60px] max-w-[100px]"></div>
                <div class="ml-5 flex h-full items-start">
                  <boteBasura-icon
                    class="cursor-pointer text-20 text-[#2c2930] transition-all duration-300 ease-in-out hover:text-red-500"
                    @click="deleteItemCart(index)"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- text-info button -->
          <div
            class="sp flex w-full flex-col items-end justify-end bg-white-white"
          >
            <div
              class="my-5 flex w-full cursor-pointer items-center justify-center border-b border-[#ededed] py-8 text-14 font-normal text-[#2c2930] transition-all duration-300 ease-in-out hover:text-[#a1a1a1]"
            >
              <button
                class="rounded-5 px-8 py-6 text-16 font-bold"
                :style="{
                  backgroundColor:
                    settingByTemplate?.color_primario ?? '#25D366',
                  color: settingByTemplate?.color_secundario ?? '#FFFFFF',
                  border: `2px solid ${
                    settingByTemplate?.color_primario ?? '#25D366'
                  }`,
                }"
                @click="closedOrder"
              >
                <p>
                  {{ $t('footer_continue') }}
                </p>
              </button>
            </div>
            <div class="w-full">
              <span class="order_total_domicile">
                <p style="font-weight: bold; font-size: 16px">
                  {{ $t('footer_costoDomicilio') }}
                </p>
                <details
                  v-if="
                    rangosByCiudad.envio_metodo === 'precio_ciudad' &&
                    shippingCities.length > 0 &&
                    !getFreeShipping &&
                    !FreeShippingCart
                  "
                >
                  <summary class="text-color">
                    {{ $t('footer_valorCiudad') }}
                  </summary>
                  <section>
                    <ol class="scroll_cart_summary_items_cities">
                      <li
                        v-for="(ciudad, index) in rangosByCiudad.rangos"
                        :key="ciudad.id"
                      >
                        <div v-if="ciudad.price > 0">
                          <b>
                            {{
                              shippingCities[index].nombre_ciu ===
                              'Sin especificar'
                                ? 'Resto del país'
                                : shippingCities[index].nombre_ciu
                            }}:
                          </b>
                          <p>
                            {{
                              ciudad.price
                                | currency(
                                  dataStore.tiendasInfo.paises.codigo,
                                  dataStore.tiendasInfo.moneda
                                )
                            }}
                          </p>
                        </div>
                      </li>
                    </ol>
                  </section>
                </details>
                <div
                  v-else-if="
                    rangosByCiudad.envio_metodo === 'tarifa_plana' &&
                    shipping > 0 &&
                    getFreeShipping &&
                    !FreeShippingCart
                  "
                >
                  <li class="text-color list-none">
                    {{ $t('footer_tarifaPlana') }}
                    {{
                      rangosByCiudad.valor
                        | currency(
                          dataStore.tiendasInfo.paises.codigo,
                          dataStore.tiendasInfo.moneda
                        )
                    }}
                  </li>
                </div>
                <div
                  v-else-if="
                    rangosByCiudad.envio_metodo === 'precio' &&
                    getFreeShipping &&
                    !FreeShippingCart
                  "
                >
                  <div v-if="shippingTarifaPrecio > 0">
                    <p class="text-color">
                      {{
                        shippingTarifaPrecio
                          | currency(
                            dataStore.tiendasInfo.paises.codigo,
                            dataStore.tiendasInfo.moneda
                          )
                      }}
                    </p>
                  </div>
                  <p v-else-if="shippingTarifaPrecio >= 0" class="text-color">
                    {{ $t('footer_tarifaPrecio') }}
                  </p>
                  <p v-else class="text-TarifaPrecio">
                    {{ $t('footer_encioNoconfig') }}
                  </p>
                </div>
                <p
                  v-else-if="
                    rangosByCiudad.envio_metodo === 'gratis' &&
                    shippingCities.length <= 0 &&
                    !getFreeShipping &&
                    !FreeShippingCart
                  "
                  class="without_shipping_cost"
                >
                  {{ $t('footer_encioGratis') }}
                </p>
                <p
                  v-else-if="
                    rangosByCiudad.envio_metodo === 'sintarifa' &&
                    shippingCities.length <= 0 &&
                    !getFreeShipping &&
                    !FreeShippingCart
                  "
                  class="without_shipping_cost"
                >
                  {{ $t('footer_enviosPorPagar') }}
                </p>
                <p
                  v-else-if="
                    rangosByCiudad.envio_metodo === 'sinEnvio' &&
                    shippingCities.length <= 0 &&
                    !getFreeShipping
                  "
                  class="without_shipping_cost"
                >
                  No aplica
                </p>

                <p v-else-if="FreeShippingCart" class="without_shipping_cost">
                  {{ $t('footer_tarifaPrecio') }}
                </p>
              </span>
              <span v-if="discountDescuentos" class="order_total_net">
                <p>{{ $t('footer_descuento') }}</p>
                <p>
                  -
                  {{
                    discountDescuentos
                      | currency(
                        dataStore.tiendasInfo.paises.codigo,
                        dataStore.tiendasInfo.moneda
                      )
                  }}
                </p>
              </span>
              <span class="order_total_net">
                <p>{{ $t('cart_subtotal') }}</p>
                <p>
                  {{
                    totalCart
                      | currency(
                        dataStore.tiendasInfo.paises.codigo,
                        dataStore.tiendasInfo.moneda
                      )
                  }}
                </p>
              </span>
              <span class="order_total_net">
                <p>{{ $t('footer_totalPagar') }}</p>
                <p>
                  {{
                    (totalCart +
                      (shipping ? shipping : 0) +
                      (shippingTarifaPrecio &&
                      shippingTarifaPrecio != 'empty' &&
                      !FreeShippingCart
                        ? shippingTarifaPrecio
                        : 0) -
                      discountDescuentos)
                      | currency(
                        dataStore.tiendasInfo.paises.codigo,
                        dataStore.tiendasInfo.moneda
                      )
                  }}
                </p>
              </span>
            </div>
            <div class="w-full">
              <!-- no tiene cobertura de país, compra por whatsApp -->
              <div
                v-if="
                  isQuotation() ||
                  (!countryStore &&
                    productsCart.length &&
                    dataStore.estado == 1)
                "
                class="mb-10 w-full"
              >
                <p
                  class="mb-10 text-center text-14 font-semibold text-[#2c2930]"
                >
                  {{ $t('footer_contactoMgs') }}
                </p>
                <!-- v-if="
                      !stateOrderWapi && expiredDate(dataStore.fechaExpiracion)
                    " -->
                <button
                  class="flex w-full items-center justify-center rounded-5 border-2 border-[#2c2930] bg-[#2c2930] px-10 py-8 text-16 font-bold text-white-white transition-all duration-300 ease-in-out hover:border-[#25d366] hover:bg-[#25d366] hover:text-[#2c2930]"
                  @click="modalBehaviorWhatsApp(true)"
                >
                  <whatsapp-icon class="bottom-4 mr-5 text-24" />
                  {{ $t('footer_compraWhatsapp') }}
                </button>
              </div>
              <!-- rango de domicilio no configurado -->
              <p
                v-if="
                  productsCart.length &&
                  shippingTarifaPrecio == 'empty' &&
                  estadoShippingTarifaPrecio
                "
                class="mb-10 text-center text-14 font-semibold text-[#2c2930]"
              >
                🚨 {{ $t('footer_contactoMgs2') }}
              </p>
              <!-- tienda cerrada -->
              <p
                v-if="dataStore.estado == 0"
                class="mb-10 text-center text-14 font-semibold text-[#2c2930]"
              >
                ⛔ {{ $t('footer_tiendaCerrada') }}
              </p>
              <!-- limite de productos para comprar -->
              <p
                v-if="!IsMinValorTotal() && productsCart.length"
                class="mb-10 text-center text-14 font-semibold text-[#2c2930]"
              >
                🔒 {{ $t('cart_minimovalorProductos1') }}
                {{
                  dataStore.tiendasInfo.valorCompraMinimo
                    | currency(
                      dataStore.tiendasInfo.paises.codigo,
                      dataStore.tiendasInfo.moneda
                    )
                }}
                {{ $t('cart_minimovalorProductos2') }}
              </p>
              <!-- ir al checkout -->
              <button
                v-if="
                  !stateOrderWapi &&
                  productsCart.length &&
                  !isQuotation() &&
                  dataStore.estado == 1 &&
                  !estadoShippingTarifaPrecio &&
                  countryStore &&
                  IsMinValorTotal() &&
                  expiredDate(dataStore.fechaExpiracion)
                "
                id="InitiateCheckoutTag"
                class="mb-10 w-full rounded-5 border-2 border-[#2c2930] bg-[#2c2930] px-10 py-8 text-center text-16 font-bold text-white-white transition-all duration-300 ease-in-out hover:border-[#a1a1a1] hover:bg-[#a1a1a1] hover:text-[#2c2930]"
                @click="GoPayments"
              >
                {{ $t('footer_finalizarCompra') }}
              </button>
              <!-- ir al checkout whatsApp -->
              <button
                v-if="
                  stateOrderWapi &&
                  productsCart.length &&
                  !isQuotation() &&
                  dataStore.estado == 1 &&
                  !estadoShippingTarifaPrecio &&
                  countryStore &&
                  IsMinValorTotal() &&
                  settingByTemplate.pago_online == 1 &&
                  expiredDate(dataStore.fechaExpiracion)
                "
                id="InitiateCheckoutTag"
                class="mb-10 flex w-full items-center justify-center rounded-5 py-8 text-16 font-bold"
                :style="{
                  backgroundColor:
                    settingByTemplate?.color_primario ?? '#25D366',
                  color: settingByTemplate?.color_secundario ?? '#FFFFFF',
                  border: `2px solid ${
                    settingByTemplate?.color_primario ?? '#25D366'
                  }`,
                }"
                @click="GoPayments"
              >
                {{ $t('footer_finalizarCompra') }}
              </button>
              <!-- Comprar whatsApp -->
              <button
                v-if="
                  stateOrderWapi &&
                  productsCart.length &&
                  !isQuotation() &&
                  IsMinValorTotal() &&
                  dataStore.estado == 1 &&
                  dataStore.redes.whatsapp &&
                  expiredDate(dataStore.fechaExpiracion)
                "
                class="flex w-full items-center justify-center rounded-5 py-8 text-16 font-bold"
                :class="!stateOrderWapi ? 'mb-10' : 'mb-0'"
                :style="{
                  backgroundColor:
                    settingByTemplate?.color_primario ?? '#25D366',
                  color: settingByTemplate?.color_secundario ?? '#FFFFFF',
                  border: `2px solid ${
                    settingByTemplate?.color_primario ?? '#25D366'
                  }`,
                }"
                @click="modalBehaviorWhatsApp(true)"
              >
                <whatsapp-icon class="bottom-4 mr-5 text-24" />
                {{ $t('footer_pedidoWhatsapp') }}
              </button>
              <!-- seguir comprando, cerrar order -->
              <nuxt-link
                v-if="!stateOrderWapi"
                :to="setUrlCloseOrder"
                class="w-full"
              >
                <p
                  class="rounded-5 border-2 border-[#2c2930] bg-transparent px-10 py-8 text-center text-16 font-bold text-[#2c2930] transition-all duration-300 ease-in-out hover:border-[#a1a1a1] hover:text-[#a1a1a1]"
                  @click="closedOrder"
                >
                  {{ $t('footer_seguirCompra') }}
                </p>
              </nuxt-link>
            </div>
          </div>
        </div>
        <!-- carrito sin productos -->
        <div
          v-else
          class="flex h-full w-full flex-col justify-between overflow-y-auto"
        >
          <div
            class="mb-10 flex h-full w-full flex-col items-center justify-center"
          >
            <img
              src="../../../assets/img/icono_cesta.png"
              style="width: 220px"
              class="object-cover object-bottom"
              alt="Img cart empty"
            />
            <p class="mb-10 mt-15 text-18 font-bold text-[#2c2930]">
              {{ $t('footer_carritoVacio2') }}
            </p>
            <p class="mb-10 text-center text-16 font-normal text-[#2c2930]">
              {{ $t('footer_carritoVacio3') }}
            </p>
          </div>
          <nuxt-link class="w-full" :to="setUrlCloseOrder">
            <p
              class="rounded-5 border-2 border-[#2c2930] bg-transparent px-10 py-8 text-center text-16 font-bold text-[#2c2930] transition-all duration-300 ease-in-out hover:border-[#a1a1a1] hover:text-[#a1a1a1]"
              @click="closedOrder"
            >
              {{ $t('footer_seguirCompra') }}
            </p>
          </nuxt-link>
        </div>
      </div>
      <!-- ventanas emergentes -->
      <div
        v-if="remove"
        class="absolute top-0 z-10 flex h-dvh w-full items-center justify-center bg-[#000005ec] transition-all duration-300 ease-in-out"
      >
        <div
          class="mx-20 flex w-full flex-col items-center justify-center rounded-5 border border-[#ededed] bg-white-white p-20 shadow-md"
        >
          <p class="py-20 text-center text-16 font-normal text-[#2c2930]">
            {{ $t('footer_contactoMgs3') }}
          </p>
          <div class="flex w-full flex-row items-center justify-around">
            <button
              class="w-full max-w-[80px] rounded-5 border border-red-500 bg-transparent py-4 text-center font-bold text-red-500 transition-all duration-300 ease-in-out hover:border-red-700 hover:text-red-700"
              @click="remove = !remove"
            >
              {{ $t('footer_noCart') }}
            </button>
            <button
              class="w-full max-w-[80px] rounded-5 border border-[#2c2930] bg-[#2c2930] py-4 text-center font-bold text-white-white transition-all duration-300 ease-in-out hover:border-[#a1a1a1] hover:bg-[#a1a1a1] hover:text-[#2c2930]"
              @click="removeCartItems"
            >
              {{ $t('footer_siCart') }}
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="formOrdenWhatsAPP"
        class="absolute top-0 z-10 flex h-dvh w-full flex-col items-center justify-between overflow-y-auto bg-white-white pb-60 pt-20"
      >
        <div
          class="relative flex w-full flex-col items-center justify-center px-20"
        >
          <div class="flex w-full items-center justify-between">
            <h3 class="font-medium text-[#2c2930]">
              {{ $t('footer_formtittle') }}
            </h3>
            <label
              for="order_close"
              class="cursor-pointer text-30 text-[#25d366] transition-all duration-300 ease-in-out hover:text-[#1da850]"
              @click="modalBehaviorWhatsApp(false)"
            >
              <close-icon />
            </label>
          </div>
          <ValidationObserver
            v-if="
              (inputCheckoutWPP && inputCheckoutWPP.length === 0) ||
              inputCheckoutWPP === null ||
              inputCheckoutWPP === undefined
            "
            ref="observer"
            tag="form"
            class="w-full pt-20"
          >
            <p class="mb-2 text-14 font-medium text-[#7e7e7e]">
              {{ $t('footer_formNombre') }}
            </p>
            <validation-provider
              name="nombre"
              rules="required"
              class="flex w-full flex-col"
            >
              <template slot-scope="{ errors }">
                <input
                  id="ContactName"
                  v-model="form.nombre"
                  name="nombre"
                  type="text"
                  class="input-text"
                  :placeholder="$t('footer_formNombreMgs')"
                  onkeypress="return ((event.charCode>96 && event.charCode<123) || (event.charCode>64 && event.charCode<91) || (event.charCode==32) || (event.charCode==241) || (event.charCode==209))"
                />
                <span
                  v-if="errors[0]"
                  class="ml-10 w-full text-xs text-red-500"
                >
                  {{ errors[0] }}
                </span>
                <div v-else class="mb-18"></div>
              </template>
            </validation-provider>
            <p class="mb-2 text-14 font-medium text-[#7e7e7e]">
              {{ $t('footer_formIdenti') }}
            </p>
            <validation-provider
              name="id"
              rules="required"
              class="flex w-full flex-col"
            >
              <template slot-scope="{ errors }">
                <input
                  id="ContactId"
                  v-model="form.phone"
                  name="id"
                  type="number"
                  class="input-text"
                  :placeholder="$t('footer_formIdentiMgs')"
                  onkeypress="return ((event.charCode>47 && event.charCode<58))"
                />
                <span
                  v-if="errors[0]"
                  class="ml-10 w-full text-xs text-red-500"
                >
                  {{ errors[0] }}
                </span>
                <div v-else class="mb-18"></div>
              </template>
            </validation-provider>
            <p class="mb-2 text-14 font-medium text-[#7e7e7e]">
              {{ $t('footer_formCorreo') }} ({{ $t('footer_norquerido') }})
            </p>
            <validation-provider name="email" class="flex w-full flex-col">
              <template slot-scope="{ errors }">
                <input
                  id="ContactEmail"
                  v-model="form.email"
                  name="email"
                  type="text"
                  class="input-text"
                  :placeholder="$t('footer_formCorreoMgs')"
                />
                <span
                  v-if="errors[0]"
                  class="ml-10 w-full text-xs text-red-500"
                >
                  {{ errors[0] }}
                </span>
                <div v-else class="mb-18"></div>
              </template>
            </validation-provider>
            <p class="mb-2 text-14 font-medium text-[#7e7e7e]">
              {{ $t('footer_formPhone') }}
            </p>
            <validation-provider
              name="phone"
              rules="required"
              class="flex w-full flex-col"
            >
              <template slot-scope="{ errors }">
                <input
                  id="ContactTelephone"
                  v-model="form.identificacion"
                  name="telephone"
                  type="text"
                  class="input-text"
                  :placeholder="$t('footer_formPhoneMgs')"
                  onkeypress="return ((event.charCode>47 && event.charCode<58))"
                />
                <span
                  v-if="errors[0]"
                  class="ml-10 w-full text-xs text-red-500"
                >
                  {{ errors[0] }}
                </span>
                <div v-else class="mb-18"></div>
              </template>
            </validation-provider>
            <P class="mb-2 text-14 font-medium text-[#7e7e7e]">
              {{ $t(`${placeholderDepart}`) }}
            </P>
            <validation-provider
              name="ciudad"
              rules="required"
              class="flex w-full flex-col"
            >
              <template slot-scope="{ errors }">
                <input
                  v-model="form.ciudad"
                  class="input-text"
                  name="ciudad"
                  :placeholder="$t('footer_formBarrioMgs')"
                  onkeypress="return ((event.charCode>96 && event.charCode<123) || (event.charCode>64 && event.charCode<91) || (event.charCode==32) || (event.charCode==241) || (event.charCode==209))"
                />
                <span
                  v-if="errors[0]"
                  class="ml-10 w-full text-xs text-red-500"
                >
                  {{ errors[0] }}
                </span>
                <div v-else class="mb-18"></div>
              </template>
            </validation-provider>
            <P class="mb-2 text-14 font-medium text-[#7e7e7e]">
              {{ $t(`${placeholderBarrio}`) }}
            </P>
            <validation-provider
              name="barrio"
              rules="required"
              class="flex w-full flex-col"
            >
              <template slot-scope="{ errors }">
                <input
                  v-model="form.barrio"
                  class="input-text"
                  name="barrio"
                  :placeholder="$t(`${placeholderMsgBarrio}`)"
                  onkeypress="return ((event.charCode>96 && event.charCode<123) || (event.charCode>64 && event.charCode<91) || (event.charCode==32) || (event.charCode==241) || (event.charCode==209))"
                />
                <span
                  v-if="errors[0]"
                  class="ml-10 w-full text-xs text-red-500"
                >
                  {{ errors[0] }}
                </span>
                <div v-else class="mb-18"></div>
              </template>
            </validation-provider>
            <P class="mb-2 text-14 font-medium text-[#7e7e7e]">
              {{ $t('footer_formDireccion') }}
            </P>
            <validation-provider
              name="dirreccion"
              rules="required"
              class="flex w-full flex-col"
            >
              <template slot-scope="{ errors }">
                <input
                  v-model="form.dirreccion"
                  class="input-text"
                  name="dirreccion"
                  :placeholder="$t('footer_formDireccionMgs')"
                />
                <span
                  v-if="errors[0]"
                  class="ml-10 w-full text-xs text-red-500"
                >
                  {{ errors[0] }}
                </span>
                <div v-else class="mb-18"></div>
              </template>
            </validation-provider>
          </ValidationObserver>
          <template v-else>
            <ValidationObserver
              ref="observer"
              tag="form"
              class="w-full overflow-x-hidden"
            >
              <div
                v-for="(item, index) in inputCheckoutWPP"
                :key="index"
                class="w-full"
              >
                <label
                  class="mb-2 text-14 font-medium text-[#7e7e7e]"
                  :class="item.requerid ? 'is-required' : ''"
                >
                  {{ item.textInput }}
                </label>
                <validation-provider class="flex w-full flex-col">
                  <template
                    slot-scope="{ errors }"
                    :name="item.id"
                    rules="required"
                  >
                    <input
                      v-model="item.value"
                      class="input-text"
                      :type="item.type"
                      :name="item.textInput"
                      :required="item.requerid ? true : false"
                    />
                    <span
                      v-if="errors[0]"
                      class="ml-10 w-full text-xs text-red-500"
                    >
                      {{ errors[0] }}
                    </span>
                    <div v-else class="mb-18"></div>
                  </template>
                </validation-provider>
              </div>
            </ValidationObserver>
          </template>
        </div>
        <button
          class="fixed bottom-10 flex w-full max-w-[370px] items-center justify-center rounded-5 py-8 text-16 font-bold md:bottom-20"
          :style="{
            backgroundColor: settingByTemplate?.color_primario ?? '#25D366',
            color: settingByTemplate?.color_secundario ?? '#FFFFFF',
            border: `2px solid ${
              settingByTemplate?.color_primario ?? '#25D366'
            }`,
          }"
          @click.prevent="setOrderWa()"
        >
          <whatsapp-icon class="bottom-4 mr-5 text-24" />
          {{ $t('footer_finalizarCompra') }}
        </button>
      </div>
      <div
        v-if="modalConfirmation"
        class="absolute top-0 z-10 flex h-dvh w-full flex-col items-center justify-center bg-[#000005ec]"
      >
        <div
          v-if="stateBtnConfirmation"
          class="mb-12 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0,0,256,256"
            class="h-40 w-40"
          >
            <g
              fill="none"
              fill-rule="nonzero"
              stroke="none"
              stroke-width="1"
              stroke-linecap="butt"
              stroke-linejoin="miter"
              stroke-miterlimit="10"
              stroke-dasharray=""
              stroke-dashoffset="0"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
              style="mix-blend-mode: normal"
            >
              <g transform="scale(5.33333,5.33333)">
                <path
                  d="M44,24c0,11.045 -8.955,20 -20,20c-11.045,0 -20,-8.955 -20,-20c0,-11.045 8.955,-20 20,-20c11.045,0 20,8.955 20,20z"
                  fill="#4caf50"
                ></path>
                <path
                  d="M34.602,14.602l-13.602,13.597l-5.602,-5.598l-2.797,2.797l8.399,8.403l16.398,-16.402z"
                  fill="#ffffff"
                ></path>
              </g>
            </g>
          </svg>
        </div>
        <p
          class="flex flex-row items-center justify-center text-center text-18 text-white-white"
        >
          <svg
            v-if="!stateBtnConfirmation"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            class="mr-10 h-20 w-20 animate-spin"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
              class="opacity-25"
            />
            <path
              fill="currentColor"
              d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              class="opacity-75"
            />
          </svg>
          {{ textConfirmation }}
        </p>

        <div
          v-if="stateBtnConfirmation"
          class="mt-5 flex flex-col items-center justify-center"
        >
          <p class="mt-3 w-9/12 text-center text-18 text-white-white">
            Tu número de orden es: {{ numberOrder }}
          </p>

          <div class="fixed bottom-75 md:bottom-85">
            <h4 class="text-center text-18 text-white-white">
              !Haz clic en el siguiente botón <br />
              para continuar el proceso!
            </h4>

            <h4
              class="mt-14 animate-bounce text-center text-6xl text-[#02E5A0]"
            >
              &#x2193;
            </h4>
          </div>

          <!-- <button
            class="fixed bottom-10 flex w-full max-w-[370px] items-center justify-center rounded-5 py-8 text-16 font-bold md:bottom-20"
            :style="{
              backgroundColor: settingByTemplate?.color_primario ?? '#25D366',
              color: settingByTemplate?.color_secundario ?? '#FFFFFF',
              border: `2px solid ${
                settingByTemplate?.color_primario ?? '#25D366'
              }`,
            }"
            @click="redirectWP"
          >
            <whatsapp-icon class="bottom-4 mr-5 text-24" /> Enviar información
            al WhatsApp
          </button> -->
          <button
            class="fixed bottom-25 flex w-full max-w-[370px] items-center justify-center rounded-5 py-8 text-16 font-bold md:bottom-30"
            :style="{
              backgroundColor: '#25D366',
              color: '#FFFFFF',
              border: `2px solid ${'#25D366'}`,
            }"
            @click="redirectWP"
          >
            <whatsapp-icon class="bottom-4 mr-5 text-24" /> Continuar compra
          </button>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import axios from 'axios'
import { mapState, mapGetters } from 'vuex'
import idCloudinary from '@/mixins/idCloudinary'
import currency from '@/mixins/formatCurrent'
import expiredDate from '@/mixins/expiredDate'
import mobileCheck from '@/mixins/mobileCheck'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  name: 'KoOrderCart',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  filters: {
    capitalize(value) {
      if (value) {
        value = value.toLowerCase()
        return value.replace(/^\w|\s\w/g, (l) => l.toUpperCase())
      }
    },
  },
  mixins: [idCloudinary, currency, expiredDate, mobileCheck],
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    stateOrderWapi: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    quickSale: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      // img: 'https://res.cloudinary.com/komerciaacademico/image/upload/v1583535445/komerciaAcademico/CARRITO_y2lbh6.png',
      shippingCities: [],
      // rangosByCiudad: [],
      remove: false,
      shippingTarifaPrecio: '',
      estadoShippingTarifaPrecio: false,
      // formOrden: false,
      form: {
        nombre: '',
        identificacion: '',
        phone: '',
        email: '',
        ciudad: '',
        barrio: '',
        dirreccion: '',
      },
      formStringify: '',
      FreeShippingCart: false,
      placeholderBarrio: 'footer_formBarrio',
      placeholderMsgBarrio: 'footer_formBarrioMgs',
      stateBtnConfirmation: false,
      textConfirmation: '!Generando orden de compra!',
      modalConfirmation: false,
      discountDescuentos: 0,
      stateProductCart: 1,
      textDepartment: '',
      textCiudad: '',
      numberOrder: null,
    }
  },
  computed: {
    ...mapState(['cities', 'totalCart', 'productsCart', 'checkoutWhatsApp']),
    ...mapGetters(['userDropshipping', 'locationStore', 'cantidadProductos']),
    ...mapState({
      layoutUniCentro: (state) => state.layoutUnicentro,
      facebookPixel: (state) => state.analytics_tagmanager,
    }),
    openOrder: {
      get() {
        return this.$store.state.openOrder
      },
      set(value) {
        this.$store.state.openOrder = value
      },
    },
    isOrderOpen() {
      return this.$store.state.openOrder // Asegúrate de que el nombre del estado sea correcto
    },
    formOrdenWhatsAPP: {
      get() {
        return this.$store.state.formOrdenWhatsAPP
      },
      set(value) {
        this.$store.commit('SET_STATE_FORM_MODAL_WHATS_APP', value)
      },
    },
    shippingDescuento() {
      return this.$store.getters.listaDescuentosProductos
    },
    shippingDescuento2() {
      return this.$store.getters.listaDescuentosPrecio
    },
    getFreeShipping() {
      const freeMethods = ['tarifa_plana', 'precio']
      return freeMethods.includes(this.rangosByCiudad.envio_metodo)
    },
    rangosByCiudad() {
      return this.$store.state.envios.valores
    },
    shipping() {
      // if (this.FreeShippingCart || !this.$store.state?.envios?.estado) {

      if (this.FreeShippingCart) {
        return 0
      }

      switch (this.rangosByCiudad.envio_metodo) {
        case 'sinEnvio':
        case 'sintarifa':
        case 'gratis':
          return 0
        case 'tarifa_plana':
          return this.rangosByCiudad.valor
        case 'precio_ciudad':
          // eslint-disable-next-line no-case-declarations
          const result = this.rangosByCiudad.rangos.find((rango) => {
            return (
              this.totalCart >= rango.inicial && this.totalCart <= rango.final
            )
          })
          return result ? result.precio : 0
        default:
          return 0
      }
    },
    countryStore() {
      if (this.dataStore && this.dataStore.tiendasInfo.paises.pais) {
        const supportedCountries = ['Colombia', 'Chile', 'Perú', 'Panamá']
        return supportedCountries.includes(
          this.dataStore.tiendasInfo.paises.pais
        )
      }
      return false
    },
    settingByTemplate() {
      return (
        this.$store.state.settingByTemplate ||
        this.$store.state.settingBaseWapir
      )
    },
    inputCheckoutWPP() {
      return this.checkoutWhatsApp?.configuration
        ? JSON.parse(this.checkoutWhatsApp.configuration)
        : null
    },
    setUrlCloseOrder() {
      if (this.dataStore.id === 7454) {
        return this.$route.fullPath
      } else {
        const isTemplateFiveOrTwelve =
          this.dataStore.template === 5 || this.dataStore.template === 12

        return isTemplateFiveOrTwelve ? '/' : '/productos'
      }
    },
  },
  watch: {
    rangosByCiudad() {
      this.filterCities()
    },
    isOrderOpen(newValue) {
      if (newValue) {
        // Cuando el modal se abre, añadimos una clase al body
        document.body.classList.add('body-no-scroll')
      } else {
        // Cuando se cierra, la quitamos
        document.body.classList.remove('body-no-scroll')
      }
    },
    // cities() {
    //   this.filterCities()
    // },
    productsCart() {
      if (this.productsCart) {
        this.tempCart = this.productsCart
        this.shippingPrecio()
        this.productsFreeShippingCart()
      }
    },
    totalCart() {
      this.shippingPrecio()
      this.IsMinValorTotal()
      this.obtainDiscountValue()
    },
    shippingDescuento() {
      this.obtainDiscountValue()
    },
    shippingDescuento2() {
      this.obtainDiscountValue()
    },
    openOrder(value) {
      if (!value && this.quickSale && this.quickSale.state) {
        this.$store.commit('DELETE_ALL_ITEMS_CART')
        this.$store.commit('UPDATE_CONTENT_CART')
        this.$store.commit('SET_OPEN_ORDER', false)
        this.$store.commit('SET_STATE_FORM_MODAL_WHATS_APP', false)
      }
    },
  },
  async mounted() {
    this.getCities()
    this.setPlaceholderDep()
    this.$store.dispatch('GET_DESCUENTOS')
    if (this.$route.query?.clearCart != 'true') {
      this.$store.dispatch('GET_SHOPPING_CART')
    }
    this.$store.commit('CALCULATE_TOTAL_CART')
    if (this.rangosByCiudad.envio_metodo == 'precio') {
      this.shippingPrecio()
    }
    this.productsFreeShippingCart()
    this.IsMinValorTotal()
    this.obtainDiscountValue()
  },
  methods: {
    modalBehaviorWhatsApp(value) {
      if (this.quickSale?.state) {
        this.$store.commit('DELETE_ALL_ITEMS_CART')
        this.$store.commit('UPDATE_CONTENT_CART')
        this.$store.commit('SET_OPEN_ORDER', false)
        this.$store.commit('SET_STATE_FORM_MODAL_WHATS_APP', false)
      } else {
        this.formOrdenWhatsAPP = value
      }
    },
    obtainDiscountValue() {
      let value1 = 0
      let value2 = 0
      if (this.shippingDescuento && this.shippingDescuento.tipo == 1) {
        value1 = this.shippingDescuento.valor ? this.shippingDescuento.valor : 0
      } else if (this.shippingDescuento && this.shippingDescuento.tipo == 0) {
        value1 = this.shippingDescuento.valor
          ? Math.trunc((this.totalCart * this.shippingDescuento.valor) / 100)
          : 0
      }
      if (this.shippingDescuento2 && this.shippingDescuento2.precio) {
        if (this.shippingDescuento2.options == 0) {
          value2 = parseInt(this.shippingDescuento2.precio)
            ? Math.trunc(
                (this.totalCart * parseInt(this.shippingDescuento2.precio)) /
                  100
              )
            : 0
        } else if (this.shippingDescuento2.options == 1) {
          value2 = this.shippingDescuento2.precio
        }
      }
      this.discountDescuentos = value1 + value2
    },
    shippingPrecio() {
      if (!this.FreeShippingCart) {
        if (this.rangosByCiudad.envio_metodo == 'precio') {
          let result = this.rangosByCiudad.rangos.find(
            (rango) =>
              this.totalCart >= rango.inicial && this.totalCart <= rango.final
          )
          this.shippingTarifaPrecio = result ? result.precio : 'empty'
          this.estadoShippingTarifaPrecio = !result
        }
      }
    },
    isQuotation() {
      return this.productsCart.some((product) => product.precio === 0)
    },
    IsMinValorTotal() {
      return (
        this.dataStore.tiendasInfo.valorCompraMinimo == 0 ||
        this.dataStore.tiendasInfo.valorCompraMinimo == null ||
        this.totalCart >= this.dataStore.tiendasInfo.valorCompraMinimo
      )
    },
    addQuantity(product) {
      if (product.limitQuantity > product.cantidad) {
        product.cantidad++
        this.$store.commit('UPDATE_CONTENT_CART')
        this.$store.commit('CALCULATE_TOTAL_CART')
        // this.$store.dispatch('VERIFY_PRODUCTS')
      }
    },
    removeQuantity(product) {
      if (product.cantidad >= 2) {
        product.cantidad--
        this.$store.commit('UPDATE_CONTENT_CART')
        this.$store.commit('CALCULATE_TOTAL_CART')
        // this.$store.dispatch('VERIFY_PRODUCTS')
      }
    },
    deleteItemCart(i) {
      this.$store.commit('DELETEITEMCART', i)
      this.$store.commit('UPDATE_CONTENT_CART')
      // this.$store.dispatch('VERIFY_PRODUCTS')
    },
    removeCartItems() {
      this.remove = false
      location.reload(true)
      this.$store.commit('DELETE_ALL_ITEMS_CART')
      this.$store.commit('UPDATE_CONTENT_CART')
      // this.$store.dispatch('VERIFY_PRODUCTS')
    },

    closedOrder() {
      this.$store.commit('SET_OPEN_ORDER', false)
    },
    GoPayments() {
      let objeto = {}
      objeto = JSON.parse(JSON.stringify(this.productsCart))
      console.log('objeto', objeto)
      console.log('Entre a la funcion')
      objeto.map((element) => {
        // DATOS IMPORTANTES A ENVIAR = ID - CANTIDAD - COMBINACION
        if (element.id) {
          delete element.envio_gratis
          delete element.foto_cloudinary
          delete element.limitQuantity
          delete element.nombre
          delete element.precio
          delete element.activo
          delete element.stock_disponible
          delete element.con_variante
          delete element.foto
          delete element.informacion_producto
          delete element.orden
          delete element.tag
          delete element.variantes
          delete element.tag_promocion
          delete element.promocion_valor
        }
      })
      let json = {
        products: objeto,
        tienda: {
          id: this.dataStore.id,
        },
        canal: 'KOMERCIA',
      }
      json = JSON.stringify(json)
      if (this.productsCart.length != 0) {
        this.$store.dispatch('SEND_ADD_TO_CART', 2)

        this.$store.commit('DELETE_ALL_ITEMS_CART')
        this.$store.commit('UPDATE_CONTENT_CART')
        if (this.layoutUniCentro) {
          window.open(`https://checkout.komercia.co/?params=${json}`)
        } else {
          location.href = `https://checkout.komercia.co/?params=${json}`
        }
      }
    },
    async sendAnalyticsStore(value, event) {
      await this.$store.dispatch('SEND_ANALYTICS_STORE', {
        storeId: value,
        event: event,
      })
    },
    async getCities() {
      if (this.rangosByCiudad.envio_metodo === 'precio_ciudad') {
        const { success } = await this.$store.dispatch('GET_CITIES')
        if (success) {
          this.filterCities()
        }
      }
    },
    filterCities() {
      if (
        this.rangosByCiudad.envio_metodo === 'precio_ciudad' &&
        this.cities.length > 0
      ) {
        this.rangosByCiudad.rangos.forEach((rango, index) => {
          this.cities.filter((city) => {
            if (city.id === this.rangosByCiudad.rangos[index].id) {
              this.shippingCities.push(city)
            }
          })
        })
      }
    },
    redirectWP() {
      let baseUrlMovil = 'https://api.whatsapp.com/send?phone='
      let baseUrlPc = 'https://web.whatsapp.com/send?phone='
      let productosCart = []
      this.productsCart.map((element) => {
        if (element.combinacion) {
          let combiString = JSON.stringify(element.combinacion)
          let combiList = combiString.replace(/"/g, '')
          let resultcombitList = combiList.replace(/,/g, ' - ')
          productosCart.push(
            `${element.cantidad} x ${
              element.nombre
            } = Variantes: ${resultcombitList} -> Valor: ${
              this.dataStore.tiendasInfo.moneda == 'PEN' ? 'S/' : '$'
            }${element.cantidad * element.precio}`
          )
        } else {
          productosCart.push(
            `${element.cantidad} x ${element.nombre} -> Valor: ${
              this.dataStore.tiendasInfo.moneda == 'PEN' ? 'S/' : '$'
            }${element.cantidad * element.precio}`
          )
        }
      })
      // agrega %2A y %2A al inicio y al final de la cadena cuando se agrega mas de un producto
      let productString = JSON.stringify(productosCart)
      let productList = productString.replace(/"/g, '')
      let resultproductList = productList.replace(/,/g, '%2A%0A%2A')
      let result = resultproductList.slice(1, -1)
      var text = ''
      if (
        (this.inputCheckoutWPP && this.inputCheckoutWPP.length === 0) ||
        this.inputCheckoutWPP === null ||
        this.inputCheckoutWPP === undefined
      ) {
        if (this.dataStore.tiendasInfo.lenguaje == 'es') {
          text = `Hola%2C%20soy%20${
            this.form.nombre
          }%2C%0Ahice%20este%20pedido%20en%20tu%20tienda%20${encodeURIComponent(
            this.dataStore.nombre
          )}%0ANumero%20de%20orden%3A%20${
            this.numberOrder
          }%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%2A${result}%2A%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%2A${this.translateDeliveryMethod()}%2A%0A%2ADescuento%2A%3A%20${
            this.discountDescuentos
              ? this.dataStore.tiendasInfo.moneda == 'PEN'
                ? '- S/'
                : '- $' + this.discountDescuentos
              : 'No%20aplica'
          }%0A%2ASubtotal%2A%3A%20${
            this.dataStore.tiendasInfo.moneda == 'PEN' ? 'S/' : '$'
          }${this.totalCart}%0A%2ATOTAL%2A%3A%20${
            this.dataStore.tiendasInfo.moneda == 'PEN' ? 'S/' : '$'
          }${
            this.totalCart +
            (this.shipping ? this.shipping : 0) +
            (this.shippingTarifaPrecio &&
            this.shippingTarifaPrecio != 'empty' &&
            !this.FreeShippingCart
              ? this.shippingTarifaPrecio
              : 0) -
            this.discountDescuentos
          }%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%2AMi%20informaci%C3%B3n%2A%3A%0A%2ANombre%2A%3A%20${
            this.form.nombre
          }%0A%2AIdentificación%2A%3A%20${encodeURIComponent(
            this.form.phone
          )}%0A%2AE-mail%2A%3A%20${encodeURIComponent(
            this.form.email ? this.form.email : ''
          )}%0A%2A${this.textDepartment}%2A%3A%20${encodeURIComponent(
            this.form.ciudad
          )}%0A%2A${encodeURIComponent(
            this.textCiudad
          )}%2A%3A%20${encodeURIComponent(
            this.form.barrio
          )}%0A%2ADirección%2A%3A%20${encodeURIComponent(
            this.form.dirreccion
          )}%0A%0A%2Avolver%20a%20la%20tienda%2A%3A%20${
            window.location
          }?clearCart=true`
        } else if (this.dataStore.tiendasInfo.lenguaje == 'en') {
          text = `Hello%2C%20I%20am%20${
            this.form.nombre
          }%2C%0AI%20made%20this%20order%20at%20your%20store%20${encodeURIComponent(
            this.dataStore.nombre
          )}%0AOrder%20number%3A%20${
            this.numberOrder
          }%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%2A${result}%2A%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%2A${this.translateDeliveryMethod()}%2A%0A%2ADiscount%2A%3A%20${
            this.discountDescuentos
              ? this.dataStore.tiendasInfo.moneda == 'PEN'
                ? '- S/'
                : '- $' + this.discountDescuentos
              : 'Not%20applicable'
          }%0A%2ASubtotal%2A%3A%20${
            this.dataStore.tiendasInfo.moneda == 'PEN' ? 'S/' : '$'
          }${this.totalCart}%0A%2ATOTAL%2A%3A%20${
            this.dataStore.tiendasInfo.moneda == 'PEN' ? 'S/' : '$'
          }${
            this.totalCart +
            (this.shipping ? this.shipping : 0) +
            (this.shippingTarifaPrecio &&
            this.shippingTarifaPrecio != 'empty' &&
            !this.FreeShippingCart
              ? this.shippingTarifaPrecio
              : 0) -
            this.discountDescuentos
          }%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%2AMy%20information%2A%3A%0A%2AName%2A%3A%20${
            this.form.nombre
          }%0A%2AIdentification%2A%3A%20${encodeURIComponent(
            this.form.phone
          )}%0A%2AE-mail%2A%3A%20${encodeURIComponent(
            this.form.email ? this.form.email : ''
          )}%0A%2A${this.textDepartment}%2A%3A%20${
            this.form.ciudad
          }%0A%2A${encodeURIComponent(this.textCiudad)}%2A%3A%20${
            this.form.barrio
          }%0A%2AAddres%2A%3A%20${encodeURIComponent(
            this.form.dirreccion
          )}%0A%0A%2Aback%20to%20the%20store%2A%3A%20${
            window.location
          }?clearCart=true`
        } else if (this.dataStore.tiendasInfo.lenguaje == 'pt') {
          text = `Olá%2C%20aqui%20é%20${
            this.form.nombre
          }%2C%0Afiz%20esse%20pedido%20em%20sua%20loja%20Mustad%20Whatsapp%20${encodeURIComponent(
            this.dataStore.nombre
          )}%0AN%C3%BAmero%20do%20pedido%3A%20${
            this.numberOrder
          }%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%2A${result}%2A%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%2A${this.translateDeliveryMethod()}%2A%0A%2ADesconto%2A%3A%20${
            this.discountDescuentos
              ? this.dataStore.tiendasInfo.moneda == 'PEN'
                ? '- S/'
                : '- $' + this.discountDescuentos
              : 'Não%20aplicável'
          }%0A%2ASubtotal%2A%3A%20${
            this.dataStore.tiendasInfo.moneda == 'PEN' ? 'S/' : '$'
          }${this.totalCart}%0A%2ATOTAL%2A%3A%20${
            this.dataStore.tiendasInfo.moneda == 'PEN' ? 'S/' : '$'
          }${
            this.totalCart +
            (this.shipping ? this.shipping : 0) +
            (this.shippingTarifaPrecio &&
            this.shippingTarifaPrecio != 'empty' &&
            !this.FreeShippingCart
              ? this.shippingTarifaPrecio
              : 0) -
            this.discountDescuentos
          }%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%2AMy%20Minhas%20informaçãoes%2A%3A%0A%2ANome%2A%3A%20${
            this.form.nombre
          }%0A%2Aidentificação%2A%3A%20${encodeURIComponent(
            this.form.phone
          )}%0A%2AE-mail%2A%3A%20${encodeURIComponent(
            this.form.email ? this.form.email : ''
          )}%0A%2A${this.textDepartment}%2A%3A%20${encodeURIComponent(
            this.form.ciudad
          )}%0A%2A${encodeURIComponent(this.textCiudad)}%2A%3A%20${
            this.form.barrio
          }%0A%2AEndereço%2A%3A%20${encodeURIComponent(
            this.form.dirreccion
          )}%0A%0A%2Ade%20volta%20%C3%A0%20loja%2A%3A%20${
            window.location
          }?clearCart=true`
        } else {
          text = `Hola%2C%20soy%20${
            this.form.nombre
          }%2C%0Ahice%20este%20pedido%20en%20tu%20tienda%20${encodeURIComponent(
            this.dataStore.nombre
          )}%0ANumero%20de%20orden%3A%20${
            this.numberOrder
          }%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%2A${result}%2A%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%2A${this.translateDeliveryMethod()}%2A%0A%2ADescuento%2A%3A%20${
            this.discountDescuentos
              ? this.dataStore.tiendasInfo.moneda == 'PEN'
                ? '- S/'
                : '- $' + this.discountDescuentos
              : 'No%20aplica'
          }%0A%2ASubtotal%2A%3A%20${
            this.dataStore.tiendasInfo.moneda == 'PEN' ? 'S/' : '$'
          }${this.totalCart}%0A%2ATOTAL%2A%3A%20${
            this.dataStore.tiendasInfo.moneda == 'PEN' ? 'S/' : '$'
          }${
            this.totalCart +
            (this.shipping ? this.shipping : 0) +
            (this.shippingTarifaPrecio &&
            this.shippingTarifaPrecio != 'empty' &&
            !this.FreeShippingCart
              ? this.shippingTarifaPrecio
              : 0) -
            this.discountDescuentos
          }%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%2AMi%20informaci%C3%B3n%2A%3A%0A%2ANombre%2A%3A%20${
            this.form.nombre
          }%0A%2AIdentificación%2A%3A%20${encodeURIComponent(
            this.form.phone
          )}%0A%2AE-mail%2A%3A%20${encodeURIComponent(
            this.form.email ? this.form.email : ''
          )}%0A%2A${this.textDepartment}%2A%3A%20${encodeURIComponent(
            this.form.ciudad
          )}%0A%2A${encodeURIComponent(
            this.textCiudad
          )}%2A%3A%20${encodeURIComponent(
            this.form.barrio
          )}%0A%2ADirección%2A%3A%20${encodeURIComponent(
            this.form.dirreccion
          )}%0A%0A%2Avolver%20a%20la%20tienda%2A%3A%20${
            window.location
          }?clearCart=true`
        }
      } else {
        if (this.dataStore.tiendasInfo.lenguaje == 'es') {
          text = `Hola%20%F0%9F%91%8B.%0AHice%20este%20pedido%20%F0%9F%93%A6%20en%20tu%20tienda%20${encodeURIComponent(
            this.dataStore.nombre
          )}%0ANumero%20de%20orden%3A%20${
            this.numberOrder
          }%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%2A${result}%2A%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%2A${this.translateDeliveryMethod()}%2A%0A%2ADescuento%2A%3A%20-${
            this.discountDescuentos
              ? this.dataStore.tiendasInfo.moneda == 'PEN'
                ? 'S/'
                : '$' + this.discountDescuentos
              : 'No%20aplica'
          }%0A%2ASubtotal%2A%3A%20${
            this.dataStore.tiendasInfo.moneda == 'PEN' ? 'S/' : '$'
          }${this.totalCart}%0A%2ATOTAL%2A%3A%20${
            this.dataStore.tiendasInfo.moneda == 'PEN' ? 'S/' : '$'
          }${
            this.totalCart +
            (this.shipping ? this.shipping : 0) +
            (this.shippingTarifaPrecio &&
            this.shippingTarifaPrecio != 'empty' &&
            !this.FreeShippingCart
              ? this.shippingTarifaPrecio
              : 0) -
            this.discountDescuentos
          }%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%2AMi%20informaci%C3%B3n%2A%3A%0A${this.formatDataCheckout()}%0A%0A%2Avolver%20a%20la%20tienda%2A%3A%20${
            this.quickSale && this.quickSale.state
              ? this.locationStore
              : window.location
          }?clearCart=true`
        } else if (this.dataStore.tiendasInfo.lenguaje == 'en') {
          text = `Hello%20%F0%9F%91%8B.%0AI%20placed%20this%20order%20%F0%9F%93%A6%20in%20your%20store.%20${encodeURIComponent(
            this.dataStore.nombre
          )}%0AOrder%20number%3A%20${
            this.numberOrder
          }%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%2A${result}%2A%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%2A${this.translateDeliveryMethod()}%2A%0A%2ADiscount%2A%3A%20${
            this.discountDescuentos
              ? this.dataStore.tiendasInfo.moneda == 'PEN'
                ? '- S/'
                : '- $' + this.discountDescuentos
              : 'Not%20applicable'
          }%0A%2ASubtotal%2A%3A%20${
            this.dataStore.tiendasInfo.moneda == 'PEN' ? 'S/' : '$'
          }${this.totalCart}%0A%2ATOTAL%2A%3A%20${
            this.dataStore.tiendasInfo.moneda == 'PEN' ? 'S/' : '$'
          }${
            this.totalCart +
            (this.shipping ? this.shipping : 0) +
            (this.shippingTarifaPrecio &&
            this.shippingTarifaPrecio != 'empty' &&
            !this.FreeShippingCart
              ? this.shippingTarifaPrecio
              : 0) -
            this.discountDescuentos
          }%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%2AMy%20information%2A%3A%0A${this.formatDataCheckout()}%0A%0A%2Aback%20to%20the%20store%2A%3A%20${
            this.quickSale && this.quickSale.state
              ? this.locationStore
              : window.location
          }?clearCart=true`
        } else if (this.dataStore.tiendasInfo.lenguaje == 'pt') {
          text = `Ol%C3%A1%20%F0%9F%91%8B.%0AEu%20coloquei%20este%20pedido%20%F0%9F%93%A6%20em%20sua%20loja.%20${encodeURIComponent(
            this.dataStore.nombre
          )}%0AN%C3%BAmero%20do%20pedido%3A%20${
            this.numberOrder
          }%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%2A${result}%2A%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%2A${this.translateDeliveryMethod()}%2A%0A%2ADesconto%2A%3A%20-${
            this.discountDescuentos
              ? this.dataStore.tiendasInfo.moneda == 'PEN'
                ? 'S/'
                : '$' + this.discountDescuentos
              : 'Não%20aplicável'
          }%0A%2ASubtotal%2A%3A%20${
            this.dataStore.tiendasInfo.moneda == 'PEN' ? 'S/' : '$'
          }${this.totalCart}%0A%2ATOTAL%2A%3A%20${
            this.dataStore.tiendasInfo.moneda == 'PEN' ? 'S/' : '$'
          }${
            this.totalCart +
            (this.shipping ? this.shipping : 0) +
            (this.shippingTarifaPrecio &&
            this.shippingTarifaPrecio != 'empty' &&
            !this.FreeShippingCart
              ? this.shippingTarifaPrecio
              : 0) -
            this.discountDescuentos
          }%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%2AMy%20Minhas%20informaçãoes%2A%3A%0A${this.formatDataCheckout()}%0A%0A%2Ade%20volta%20%C3%A0%20loja%2A%3A%20${
            this.quickSale && this.quickSale.state
              ? this.locationStore
              : window.location
          }?clearCart=true`
        } else {
          if (this.dataStore.tiendasInfo.lenguaje == 'es') {
            text = `Hola%20%F0%9F%91%8B.%0AHice%20este%20pedido%20%F0%9F%93%A6%20en%20tu%20tienda%20${encodeURIComponent(
              this.dataStore.nombre
            )}%0ANumero%20de%20orden%3A%20${
              this.numberOrder
            }%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%2A${result}%2A%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%2A${this.translateDeliveryMethod()}%2A%0A%2ADescuento%2A%3A%20${
              this.discountDescuentos
                ? this.dataStore.tiendasInfo.moneda == 'PEN'
                  ? '- S/'
                  : '- $' + this.discountDescuentos
                : 'No%20aplica'
            }%0A%2ASubtotal%2A%3A%20${
              this.dataStore.tiendasInfo.moneda == 'PEN' ? 'S/' : '$'
            }${this.totalCart}%0A%2ATOTAL%2A%3A%20${
              this.dataStore.tiendasInfo.moneda == 'PEN' ? 'S/' : '$'
            }${
              this.totalCart +
              (this.shipping ? this.shipping : 0) +
              (this.shippingTarifaPrecio &&
              this.shippingTarifaPrecio != 'empty' &&
              !this.FreeShippingCart
                ? this.shippingTarifaPrecio
                : 0) -
              this.discountDescuentos
            }%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%2AMi%20informaci%C3%B3n%2A%3A%0A${this.formatDataCheckout()}%0A%0A%2Avolver%20a%20la%20tienda%2A%3A%20${
              this.quickSale && this.quickSale.state
                ? this.locationStore
                : window.location
            }?clearCart=true`
          }
        }
      }
      if (
        this.quickSale &&
        this.quickSale.state &&
        this.quickSale.dataSeller.phone
      ) {
        if (this.quickSale.dataSeller.phone.charAt(0) == '+') {
          let phone_number_whatsapp = this.quickSale.dataSeller.phone.slice(1)
          if (this.mobileCheck()) {
            window.location.href = `${baseUrlMovil}${phone_number_whatsapp}&text=${text}`
          } else {
            window.location.href = `${baseUrlPc}${phone_number_whatsapp}&text=${text}`
          }
        }
      } else {
        if (this.dataStore.redes.whatsapp.charAt(0) == '+') {
          let phone_number_whatsapp = this.dataStore.redes.whatsapp.slice(1)
          if (this.mobileCheck()) {
            window.location.href = `${baseUrlMovil}${phone_number_whatsapp}&text=${text}`
          } else {
            window.location.href = `${baseUrlPc}${phone_number_whatsapp}&text=${text}`
          }
        } else {
          if (this.mobileCheck()) {
            window.location.href = `${baseUrlMovil}57${this.dataStore.redes.whatsapp}&text=${text}`
          } else {
            window.location.href = `${baseUrlPc}57${this.dataStore.redes.whatsapp}&text=${text}`
          }
        }
      }
      setTimeout(() => {
        this.modalConfirmation = false
        this.closedOrder()
        this.$message({
          showClose: true,
          message:
            '¡Por falta de permisos no fue posible abrir WhatsApp para enviar la información!',
          type: 'error',
          duration: 9000,
        })
        this.removeCartItems()
      }, 9000)
    },
    setOrderWa() {
      this.$refs.observer.validate().then(async (response) => {
        if (response) {
          this.modalConfirmation = true
          if (
            (this.inputCheckoutWPP && this.inputCheckoutWPP.length === 0) ||
            this.inputCheckoutWPP === null ||
            this.inputCheckoutWPP === undefined
          ) {
            let temp = {
              nombre: this.form.nombre,
              phone: this.form.phone, // Es la cedula
              correo: this.form.email,
              identificacion: this.form.identificacion, //Es el telefono
              ciudad: this.form.ciudad,
              barrio: this.form.barrio,
              direccion: this.form.dirreccion,
            }
            this.formStringify = JSON.stringify(temp)
          } else {
            this.formStringify = JSON.stringify(this.inputCheckoutWPP)
          }
          this.eventFacebookPixel()
          const params = {
            canal: 1,
            usuario: 30866,
            tipo: 0,
            tienda: this.dataStore.id,
            total:
              this.totalCart +
              (this.shipping ? this.shipping : 0) +
              (this.shippingTarifaPrecio &&
              this.shippingTarifaPrecio != 'empty' &&
              !this.FreeShippingCart
                ? this.shippingTarifaPrecio
                : 0) -
              this.discountDescuentos,
            direccion_entrega: {
              type: 0,
              value: null,
            },
            productos: this.productsCart,
            comentario: this.formStringify,
            costo_envio: this.setShipping(),
            metodo_pago: 7,
            descuento: this.discountDescuentos ? this.discountDescuentos : 0,
            reseller: this.userDropshipping
              ? Number(this.userDropshipping)
              : null,
            emailCliente: this.form.email || null,
            datosTienda: {
              logo: this.dataStore.logo || null,
              nombre: this.dataStore.nombre || null,
              subdominio: this.dataStore.subdominio || null,
              dominio: this.dataStore.tiendasInfo.dominio || null,
              email_tienda: this.dataStore.tiendasInfo.emailTienda || null,
              telefono: this.dataStore.tiendasInfo.telefono || null,
            },
          }

          try {
            const { data } = await axios({
              method: 'POST',
              url: `${this.$store.state.urlAWSsettings}/api/v1/orders`,
              // url: `${this.$store.state.urlKomercia}/api/usuario/orden`,
              data: params,
            })
            if (data) {
              this.numberOrder = data.id
              await this.$store.dispatch('SEND_NOTIFICATION_ORDER', {
                orderId: data.id,
                storeId: data.tienda,
                amount: data.total,
                paymentMethod: '7',
              })
              this.textConfirmation = '¡Información enviada a la tienda!'
              this.stateBtnConfirmation = true
              const idArray = this.productsCart.map((item) => item.id)
              this.$store.dispatch('SEND_ANALYTICS_PRODUCTO_PAY', {
                storeId: data.tienda,
                ids: idArray,
              })
            }
          } catch (err) {
            this.textConfirmation = 'Error al enviar los datos!'
            this.$message({
              message: 'Error al enviar los datos!',
              type: 'error',
            })
          }
        }
      })
    },
    setShipping() {
      if (this.rangosByCiudad) {
        switch (this.rangosByCiudad.envio_metodo) {
          case 'gratis':
          case 'precio_ciudad':
          case 'sintarifa':
            return 0

          case 'sinEnvio':
          case 'tarifa_plana':
            return this.rangosByCiudad.valor

          case 'precio':
            return this.shippingTarifaPrecio

          default:
            return 0
        }
      } else {
        return 0
      }
    },
    translateDeliveryMethod() {
      let textFreeShippingCart
      if (this.rangosByCiudad && this.rangosByCiudad.envio_metodo == 'gratis') {
        if (this.dataStore.tiendasInfo.lenguaje == 'es') {
          textFreeShippingCart = 'Env%C3%ADo%20gratis'
        } else if (this.dataStore.tiendasInfo.lenguaje == 'en') {
          textFreeShippingCart = 'Free%20shippings'
        } else if (this.dataStore.tiendasInfo.lenguaje == 'pt') {
          textFreeShippingCart = 'Frete%20gr%C3%A1tis'
        }
      } else if (
        this.rangosByCiudad &&
        this.rangosByCiudad.envio_metodo == 'tarifa_plana'
      ) {
        if (this.dataStore.tiendasInfo.lenguaje == 'es') {
          textFreeShippingCart = `Costo%20domicilio:%20${
            this.dataStore.tiendasInfo.moneda == 'PEN' ? 'S/' : '$'
          }${this.rangosByCiudad.valor}`
        } else if (this.dataStore.tiendasInfo.lenguaje == 'en') {
          textFreeShippingCart = `Shipping%cost:%20${
            this.dataStore.tiendasInfo.moneda == 'PEN' ? 'S/' : '$'
          }${this.rangosByCiudad.valor}`
        } else if (this.dataStore.tiendasInfo.lenguaje == 'pt') {
          textFreeShippingCart = `Custos%20envio:%20${
            this.dataStore.tiendasInfo.moneda == 'PEN' ? 'S/' : '$'
          }${this.rangosByCiudad.valor}`
        }
      } else if (
        this.rangosByCiudad &&
        this.rangosByCiudad.envio_metodo == 'precio_ciudad'
      ) {
        if (this.dataStore.tiendasInfo.lenguaje == 'es') {
          textFreeShippingCart = 'Costos%20de%20Env%C3%ADo%20por%20separado'
        } else if (this.dataStore.tiendasInfo.lenguaje == 'en') {
          textFreeShippingCart = 'Shipping%20cost%20separately'
        } else if (this.dataStore.tiendasInfo.lenguaje == 'pt') {
          textFreeShippingCart = 'Custos%20de%20envio%20negociar%20a%20parte'
        }
      } else if (
        this.rangosByCiudad &&
        this.rangosByCiudad.envio_metodo == 'precio'
      ) {
        if (this.dataStore.tiendasInfo.lenguaje == 'es') {
          textFreeShippingCart = `Costo%20domicilio:%20${
            this.dataStore.tiendasInfo.moneda == 'PEN' ? 'S/' : '$'
          }${this.shippingTarifaPrecio}`
        } else if (this.dataStore.tiendasInfo.lenguaje == 'en') {
          textFreeShippingCart = `Shipping%cost:%20${
            this.dataStore.tiendasInfo.moneda == 'PEN' ? 'S/' : '$'
          }${this.shippingTarifaPrecio}`
        } else if (this.dataStore.tiendasInfo.lenguaje == 'pt') {
          textFreeShippingCart = `Custos%20envio:%20${
            this.dataStore.tiendasInfo.moneda == 'PEN' ? 'S/' : '$'
          }${this.shippingTarifaPrecio}`
        }
      } else if (
        this.rangosByCiudad &&
        this.rangosByCiudad.envio_metodo == 'sintarifa'
      ) {
        if (this.dataStore.tiendasInfo.lenguaje == 'es') {
          textFreeShippingCart = 'Costos%20de%20Env%C3%ADo%20por%20separado'
        } else if (this.dataStore.tiendasInfo.lenguaje == 'en') {
          textFreeShippingCart = 'Shipping%20cost%20separately'
        } else if (this.dataStore.tiendasInfo.lenguaje == 'pt') {
          textFreeShippingCart = 'Custos%20de%20envio%20negociar%20a%20parte'
        }
      } else {
        if (this.dataStore.tiendasInfo.lenguaje == 'es') {
          textFreeShippingCart = 'Costos%20de%20Env%C3%ADo%20por%20separado'
        } else if (this.dataStore.tiendasInfo.lenguaje == 'en') {
          textFreeShippingCart = 'Shipping%20cost%20separately'
        } else if (this.dataStore.tiendasInfo.lenguaje == 'pt') {
          textFreeShippingCart = 'Custos%20de%20envio%20negociar%20a%20parte'
        }
      }
      return textFreeShippingCart
    },
    formatDataCheckout() {
      const temp = this.inputCheckoutWPP
        .filter((item) => item.value)
        .map((item) => `\n${item.textInput}: ${item.value}`)
        .join('')
      return encodeURIComponent(temp)
    },
    eventFacebookPixel() {
      let array = []
      let content = []
      this.productsCart.map((element) => {
        if (element) {
          array.push(`${element.id}`)
          let temp = {
            id: `${element.id}`,
            quantity: element.cantidad,
          }
          content.push(temp)
        }
      })
      if (this.facebookPixel?.pixel_facebook != null) {
        window.fbq('track', 'Purchase', {
          content_type: 'product',
          content_ids: array,
          contents: content,
          description: `Comprar finalizada WhatsApp`,
          value:
            this.totalCart +
            (this.shipping ? this.shipping : 0) +
            (this.shippingTarifaPrecio &&
            this.shippingTarifaPrecio != 'empty' &&
            !this.FreeShippingCart
              ? this.shippingTarifaPrecio
              : 0) -
            this.discountDescuentos,
          currency: this.dataStore.tiendasInfo.moneda,
        })
      }
    },
    productsFreeShippingCart() {
      if (this.productsCart) {
        let result = this.productsCart.filter(
          (rango) => rango.envio_gratis === 1
        )
        this.FreeShippingCart = this.productsCart.length == result.length
      }
    },
    setPlaceholderDep() {
      switch (this.dataStore.tiendasInfo.paises.id) {
        //colombia
        case 1:
          this.placeholderDepart = 'footer_formDepartamento'
          this.placeholderBarrio = 'footer_formBarrio'
          this.placeholderMsgBarrio = 'footer_formBarrioMgs'
          ;(this.textDepartment = 'Departamento'),
            (this.textCiudad = 'Cuidad / Barrio / Zona')
          break
        //Mexico
        case 3:
          this.placeholderDepart = 'footer_formEstado'
          this.placeholderBarrio = 'footer_formBarrio1'
          this.placeholderMsgBarrio = 'footer_formBarrioMgs'
          ;(this.textDepartment = 'Estado'),
            (this.textCiudad = 'Cuidad / Colonia / Zona')
          break
        //Argentina
        case 6:
          this.placeholderDepart = 'footer_formRegion'
          this.placeholderBarrio = 'footer_formComuna'
          this.placeholderMsgBarrio = 'footer_formBarrioMgs'
          ;(this.textDepartment = 'Región'),
            (this.textCiudad = 'Provincia / Comuna / Sector')
          break
        //Chile
        case 7:
          this.placeholderDepart = 'footer_formRegion'
          this.placeholderBarrio = 'footer_formComuna'
          this.placeholderMsgBarrio = 'footer_formBarrioMgs'
          ;(this.textDepartment = 'Región'),
            (this.textCiudad = 'Provincia / Comuna / Sector')
          break
        //Puerto Rico
        case 8:
          this.placeholderDepart = 'footer_formMunicipios'
          this.placeholderBarrio = 'footer_formComuna'
          this.placeholderMsgBarrio = 'footer_formBarrioMgs'
          ;(this.textDepartment = 'Municipio'),
            (this.textCiudad = 'Provincia / Comuna / Sector')
          break
        //Perú
        case 9:
          this.placeholderDepart = 'footer_formDepartamento'
          this.placeholderBarrio = 'footer_formBarrio3'
          this.placeholderMsgBarrio = 'footer_formBarrioMgs'
          ;(this.textDepartment = 'Departamento'),
            (this.textCiudad = 'Provincia / Cuidad / Zona')
          break
        //Panama
        case 10:
          this.placeholderDepart = 'footer_formProvincia'
          this.placeholderBarrio = 'footer_formBarrio2'
          this.placeholderMsgBarrio = 'footer_formBarrioMgs'
          ;(this.textDepartment = 'Provincia'),
            (this.textCiudad = 'Distritos / Zona')
          break
      }
    },
  },
}
</script>

<style scoped>
.width-drawer >>> .el-drawer__open .el-drawer.rtl {
  width: 410px !important;
}
@media (max-width: 800px) {
  .width-drawer >>> .el-drawer__open .el-drawer.rtl {
    width: 100% !important;
  }
}
.order_total_domicile,
.order_total_net {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}
.order_total_domicile p {
  color: #2c2930;
  font-weight: 300;
  font-size: 14px;
}
.text-color {
  color: #2c2930;
}
.order_total_domicile >>> .text-TarifaPrecio {
  display: flex;
  justify-content: flex-end;
  color: red;
}
.scroll_cart_summary_items_cities {
  color: #2c2930;
  overflow-y: auto;
  max-height: 150px;
  display: flex;
  flex-direction: column;
  max-width: 230px;
}
.scroll_cart_summary_items_cities li {
  margin-right: 5px;
}
.scroll_cart_summary_items_cities::-webkit-scrollbar {
  background: transparent;
  width: 4px;
}
.scroll_cart_summary_items_cities::-webkit-scrollbar-track {
  box-shadow: inset 0 0 10px var(--background_color_2);
  border-radius: 10px;
}
.scroll_cart_summary_items_cities::-webkit-scrollbar-thumb {
  background: var(--color_icon);
  border-radius: 10px;
}
.without_shipping_cost {
  color: #2c2930;
  font-size: 13px;
}
.order_total_net p {
  color: #2c2930;
  font-weight: bold;
}

details {
  color: #333;
  font-size: 13px;
  align-self: center;
  flex: 1;
  margin-left: 30px;
}
details summary {
  outline: none;
  cursor: pointer;
  text-align: right;
  font-size: 14px;
  font-weight: bold;
}
details ol {
  display: flex;
  flex-direction: column;
  padding: 5px 0;
}
details ol li div {
  padding: 2px 4px;
  display: flex;
  justify-content: space-between;
}
details ol li:nth-child(even) {
  background-color: rgba(102, 102, 102, 0.1);
}
details[open] summary ~ * {
  animation: sweep 0.5s ease-in-out;
}

.is-required:after {
  content: '*';
  margin-left: 3px;
  color: red;
  font-weight: bold;
}
.input-text {
  font-size: 13px;
  color: #7e7e7e;
  border: solid 2px #c9c9c9;
  border-radius: 8px;
  background-color: transparent;
  padding: 5px 14px;
  width: 100%;
}
.input-text::placeholder {
  color: rgba(21, 20, 57, 0.541);
  opacity: 0.7;
}
.input-text:-internal-autofill-selected {
  -webkit-appearance: menulist-button;
  background-color: transparent !important;
  background-image: none !important;
  color: -internal-light-dark-color(black, white) !important;
}
.input-text:focus,
.input-text:active {
  outline: 0;
  border: solid 2px black;
}
</style>
