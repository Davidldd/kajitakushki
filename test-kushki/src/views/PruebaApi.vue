<script setup>
import DashboardLayout from '../components/DashboardLayout.vue'
import { ref } from 'vue'

const selectedEndpoint = ref('token')
const response = ref(null)
const loading = ref(false)
const error = ref(null)

const endpoints = {
  token: {
    title: 'Card Token Request',
    method: 'POST',
    url: '/v1/tokens',
    headers: {
      'Public-Merchant-Id': '8cd43de7a8654511b20f5e8c36b88a72',
      'Content-Type': 'application/json'
    },
    body: {
    "card": {
      "name": "David Leonardo Duarte Duarte",
      "number": "4242424242424242",
      "expiryMonth": "05",
      "expiryYear": "29",
      "cvv": "123"
    },
    "totalAmount": 1000000,
    "currency": "COP"
  },
    response: {
      "code": "K322",
      "message": "Transacción rechazada.Comunícate con el equipo de soporte de Kushki para revisar el caso"
  }
  },
  charge: {
    title: 'Charge Request',
    method: 'POST',
    url: '/v1/charges',
    headers: {
      'Private-Secret-Key': '8cd43de7a8654511b20f5e8c36b88a72',
      'Content-Type': 'application/json'
    },
    body: {
  "token": "24e5cc0d47fc4b2ab098bdb7d0b94569",
  "amount": {
    "currency": "MXN",
    "subtotalIva": 0,
    "subtotalIva0": 5000,
    "iva": 0,
    "ice": 0,
    "extraTaxes": {
      "iac": 0,
      "tasaAeroportuaria": 0,
      "agenciaDeViaje": 0
    }
  },
  "metadata": {
    "key0": "value0",
    "key1": "value1",
    "key2": "value2"
  },
  "fullResponse": "v2",
  "ignoreWarnings": true,
  "contactDetails": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "user@example.com",
    "documentType": "CURP",
    "documentNumber": "ABCD123456EF",
    "phoneNumber": "+523988734644"
  },
  "orderDetails": {
    "siteDomain": "example.com",
    "shippingDetails": {
      "name": "John Doe",
      "phone": "+523988734644",
      "address": "Centro 123",
      "city": "Monterrey",
      "region": "Nuevo León",
      "country": "Mexico"
    },
    "billingDetails": {
      "name": "John Doe",
      "phone": "+523988734644",
      "address": "Centro 123",
      "city": "Monterrey",
      "region": "Nuevo León",
      "country": "Mexico"
    }
  },
  "productDetails": {
    "product": [
      {
        "id": "198952AB",
        "title": "eBook Digital Services",
        "price": 15000,
        "sku": "10101042",
        "quantity": 1
      }
    ]
  },
  "threeDomainSecure": {
    "cavv": "AAABBoVBaZKAR3BkdkFpELpWIiE=",
    "eci": "07",
    "xid": "NEpab1F1MEdtaWJ2bEY3ckYxQzE=",
    "specificationVersion": "2.2.0",
    "acceptRisk": true
  }
},
    response: {
      "ticketNumber": "922513792073660814",
      "transactionReference": "6f16659e-b711-4995-a9ae-161aecbd6521"
    }
  },
  void: {
    title: 'Void Transaction',
    method: 'POST',
    url: '/v1/voids',
    headers: {
      'Private-Secret-Key': '8cd43de7a8654511b20f5e8c36b88a72',
      'Content-Type': 'application/json'
    },
    body: {
  "fullResponse": "v2",
  "amount": {
    "subtotalIva": 500,
    "subtotalIva0": 0,
    "ice": 0,
    "iva": 0,
    "currency": "COP"
  },
  "webhooks": [
    {
      "events": [
        "approvedTransaction"
      ],
      "headers": [
        {
          "label": "json",
          "value": "12"
        }
      ],
      "urls": [
        "https://eof2hhkrta4ooo1.m.pipedream.net"
      ]
    }
  ]
},
    response: {

    "ticketNumber": "661596843269335647"

    }
  },
  transactions: {
    title: 'Get Transactions List',
    method: 'GET',
    url: '/v1/transactions',
    headers: {
      'Private-Secret-Key': '8cd43de7a8654511b20f5e8c36b88a72'
    },
    queryParams: {
      from: '2024-01-01',
      to: '2024-12-31',
      status: 'approved'
    },
    response: {
  "total": 1,
  "data": [
    {
      "account_type": "",
      "acquirer_bank": null,
      "agenciaDeViaje_value": 0,
      "approval_code": "000000",
      "approved_transaction_amount": 57.36,
      "aurus_ticket_number": "880704136755757050",
      "bank_id": "",
      "bank_name": "",
      "bin_card": "545195",
      "buy_order": "",
      "card_holder_name": "John Doe",
      "card_type": "Credit",
      "client_name": "John Doe",
      "contact_person": "John",
      "channel": "PRESTASHOP",
      "commission_type": "",
      "contact_details": {
        "document_number": "1009283738",
        "document_type": "CC",
        "email": "user@example.com",
        "first_name": "John",
        "last_name": "Doe",
        "phone_number": "+593912345678"
      },
      "converted_amount": 0,
      "converted_currency": "",
      "country": "Peru",
      "created": "2022-01-04T05:03:35.000Z",
      "credential_alias": null,
      "credential_id": null,
      "credential_metadata": null,
      "credit_type": null,
      "currency_code": "PEN",
      "description": "Payment description.",
      "document_number": "123456789",
      "document_type": "DNI",
      "email": "user@example.com",
      "foreign_card": true,
      "grace_months": "",
      "historical": [
        {
          "approved_transaction_amount": 57.36,
          "bin_card": "545195",
          "card_holder_name": "John Doe",
          "card_type": "Credit",
          "contact_person": "John",
          "country": "Peru",
          "created": "2022-01-04T05:08:47.059Z",
          "credential_alias": null,
          "credential_id": null,
          "credential_metadata": null,
          "currency_code": "PEN",
          "email": "user@example.com",
          "foreign_card": true,
          "ice_value": 0,
          "iva_value": 0,
          "last_four_digits": "5480",
          "masked_credit_card": "545195XXXXXX5480",
          "merchant_id": "20000000108481570000",
          "merchant_name": "Tu comercio",
          "nit": "12345678",
          "payment_brand": "Mastercard",
          "payment_method": "card",
          "processor_id": "1000000858816509955116107200241",
          "processor_merchant_id": "543210",
          "processor_name": "MC Processor",
          "processor_transaction_id": "463606",
          "processor_type": "gateway",
          "public_credential_id": null,
          "request_amount": 57.36,
          "response_code": "000",
          "response_text": "Transacción aprobada",
          "sale_approval_code": "000000",
          "sale_ticket_number": "880704136755757050",
          "sale_transaction_type": "SALE",
          "subtotal_iva": 0,
          "subtotal_iva0": 57.36,
          "sync_mode": "online",
          "terminal_id": null,
          "ticket_number": "661641272926959146",
          "transaction_id": "1641272926958551247",
          "transaction_reference": "0e993c1d-03f7-48d5-93e4-63bb10cea776",
          "transaction_status": "INITIALIZED",
          "transaction_type": "VOID",
          "unique_code": "1212334",
          "visibility": "visible"
        }
      ],
      "iac_value": 0,
      "ice_value": 0,
      "identification": "123456789",
      "initialized": "2022-01-28T20:28:01.459Z",
      "issuing_bank": "BANCO DE LA PRODUCCION S.A. (PRODUBANCO)",
      "iva_value": 0,
      "last_four_digits": "5480",
      "masked_account_number": "",
      "merchant_id": "20000000108481570000",
      "merchant_name": "Tu comercio",
      "metadata": {
        "key0": "value0",
        "key1": "value1",
        "key2": "value2"
      },
      "method": "",
      "number_of_months": 4,
      "operation_id": "1643403824778083825",
      "origin": "",
      "owner_merchant_id": "",
      "parent_merchant_id": "",
      "parent_ticket_number": "",
      "payment_brand": "Mastercard",
      "payment_description": "-",
      "pin": "3403824670",
      "preauth_transaction_reference": "95dc21c8-8064-44a4-acb3-bde153c25460",
      "processor": {
        "code": "566",
        "message": "El token es invalido , o ya fue usado en otra transaccion."
      },
      "processor_bank_name": "",
      "processor_id": "1000000858816509955116107200241",
      "processor_name": "MC Processor",
      "processor_private_id": "",
      "processor_transaction_id": "463606",
      "processor_type": "gateway",
      "propina_value": 0,
      "provider": "",
      "public_credential_id": null,
      "recap": null,
      "retry": 0,
      "retry_count": 0,
      "request_amount": 57.36,
      "response_code": "000",
      "response_text": "Transaccion aprobada",
      "sale_approval_code": "000000",
      "sale_ticket_number": "880704136755757050",
      "sale_transaction_type": "SALE",
      "secure_id": "",
      "secure_service": "",
      "string_taxes": "{}",
      "subscription_id": "",
      "subscription_metadata": {
        "key1": "value1",
        "key2": "value2"
      },
      "subscription_trigger": "",
      "subtotal_iva": 0,
      "subtotal_iva0": 57.36,
      "sync_mode": "online",
      "tasaAeroportuaria_value": 0,
      "terminal_id": null,
      "ticket_number": "880704136755757050",
      "token": "dffddf9aa77549148d2450d0662c6e4b",
      "total_amount": 0,
      "transaction_id": "887693705036122450",
      "transaction_reference": "11a798d5-7565-4e78-a4e7-dfb7995f1c67",
      "transaction_status": "APPROVAL",
      "transaction_type": "SALE",
      "unique_code": "1212334",
      "user_type": "Jurídica",
      "visibility": "visible",
      "void_ticket_number": "661641272926959146",
      "card_country_code": "EC",
      "card_country": "Ecuador",
      "payment_method": "card",
      "masked_credit_card": "545195XXXXXX5480",
      "security": {
        "ip": "187.252.251.37",
        "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
        "whitelist": false
      },
      "string_metadata": "{\"country\":\"Peru\",\"city\":\"Lima\",\"orderId\":\"20\",\"postalCode\":\"64700\",\"ip\":\"180.250.250.30\",\"billingAddressPhone\":null,\"totalAmount\":57.36,\"plugin\":\"prestashop\",\"province\":\"0\",\"name\":\"John\",\"currency\":\"PEN\",\"billingAddress\":\"centro #123\",\"email\":\"user@example.com\"}",
      "order_details": {
        "shipping_details": {
          "name": "John Doe",
          "phone": 593912345678,
          "address1": "Eloy Alfaro 139 y Catalina Aldaz",
          "address2": "centro 123",
          "city": "Quito",
          "region": "Pichincha",
          "country": "Ecuador",
          "zipcode": 170402
        },
        "billing_details": {
          "name": "John Doe",
          "phone": 593912345678,
          "address1": "Eloy Alfaro 139 y Catalina Aldaz",
          "address2": "centro 123",
          "city": "Quito",
          "region": "Pichincha",
          "country": "Ecuador",
          "zipcode": 170402
        },
        "site_domain": "kushki.com"
      },
      "product_details": {
        "product": [
          {
            "quantity": 3,
            "price": 19.12,
            "id": "1",
            "title": "Hummingbird printed t-shirt",
            "sku": "demo_1"
          }
        ]
      }
    }
  ]
}
  }
}

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(JSON.stringify(text, null, 2))
}
</script>

<template>
  <DashboardLayout>
    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-2xl font-semibold text-gray-900">
          Documentación de API
        </h1>
        <p class="mt-1 text-sm text-gray-600">
          Guía de integración con la API de Kushki
        </p>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <!-- Selector de endpoints -->
        <div class="bg-white shadow rounded-lg overflow-hidden mb-6">
          <div class="px-4 py-5 sm:p-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                v-for="(endpoint, key) in endpoints"
                :key="key"
                @click="selectedEndpoint = key"
                :class="[
                  'px-4 py-3 rounded-lg text-left transition-colors duration-200',
                  selectedEndpoint === key
                    ? 'bg-kushki-blue text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                ]"
              >
                <div class="font-medium">{{ endpoint.title }}</div>
                <div class="text-sm opacity-80">{{ endpoint.method }} {{ endpoint.url }}</div>
              </button>
            </div>
          </div>
        </div>

        <!-- Detalles del endpoint -->
        <div class="bg-white shadow rounded-lg overflow-hidden">
          <div class="px-4 py-5 sm:p-6">
            <div class="space-y-6">
              <!-- Título y método -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 flex items-center">
                  <span 
                    :class="[
                      'px-2 py-1 text-sm rounded mr-3',
                      {
                        'bg-green-100 text-green-800': endpoints[selectedEndpoint].method === 'GET',
                        'bg-blue-100 text-blue-800': endpoints[selectedEndpoint].method === 'POST'
                      }
                    ]"
                  >
                    {{ endpoints[selectedEndpoint].method }}
                  </span>
                  {{ endpoints[selectedEndpoint].url }}
                </h3>
              </div>

              <!-- Headers -->
              <div>
                <h4 class="text-sm font-medium text-gray-700 mb-2">Headers</h4>
                <div class="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                  <div v-for="(value, key) in endpoints[selectedEndpoint].headers" :key="key" class="flex justify-between items-center">
                    <span class="text-gray-600">{{ key }}:</span>
                    <span class="text-gray-800">{{ value }}</span>
                  </div>
                </div>
              </div>

              <!-- Body o Query Params -->
              <div v-if="endpoints[selectedEndpoint].body || endpoints[selectedEndpoint].queryParams">
                <h4 class="text-sm font-medium text-gray-700 mb-2">
                  {{ endpoints[selectedEndpoint].body ? 'Request Body' : 'Query Parameters' }}
                </h4>
                <div class="relative">
                  <pre class="bg-gray-50 rounded-lg p-4 font-mono text-sm overflow-x-auto">{{ JSON.stringify(endpoints[selectedEndpoint].body || endpoints[selectedEndpoint].queryParams, null, 2) }}</pre>
                  <button 
                    @click="copyToClipboard(endpoints[selectedEndpoint].body || endpoints[selectedEndpoint].queryParams)"
                    class="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600"
                    title="Copiar al portapapeles"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Response -->
              <div>
                <h4 class="text-sm font-medium text-gray-700 mb-2">Response Example</h4>
                <div class="relative">
                  <pre class="bg-gray-50 rounded-lg p-4 font-mono text-sm overflow-x-auto">{{ JSON.stringify(endpoints[selectedEndpoint].response, null, 2) }}</pre>
                  <button 
                    @click="copyToClipboard(endpoints[selectedEndpoint].response)"
                    class="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600"
                    title="Copiar al portapapeles"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
pre {
  max-height: 300px;
}

.endpoint-card {
  @apply p-4 rounded-lg border border-gray-200 hover:border-kushki-blue transition-colors duration-200 cursor-pointer;
}

.endpoint-card.active {
  @apply border-kushki-blue bg-blue-50;
}
</style>