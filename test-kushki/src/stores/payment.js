import { defineStore } from 'pinia'
import axios from 'axios'

export const usePaymentStore = defineStore('payment', {
  state: () => ({
    isProcessing: false,
    error: null,
    success: false,
    transactionId: null,
    amount: 0,
    kushki: null
  }),

  actions: {
    async initializeKushki() {
      try {
        this.kushki = new window.KushkiCheckout({
          form: "kushki-payment-form",
          publicMerchantId: "8cd43de7a8654511b20f5e8c36b88a72",
          inTestEnvironment: true,
          amount: {
            subtotalIva: 0,
            iva: 0,
            subtotalIva0: Math.round(this.amount * 100), // Convertir a centavos
          },
          currency: "USD",
          regional: false
        });

        this.kushki.on("payment_received", async (response) => {
          if (response.code === "000") {
            await this.processPayment(response.token);
          } else {
            this.error = response.message || 'Error generando token de pago';
            this.isProcessing = false;
          }
        });

      } catch (err) {
        this.error = 'Error inicializando pasarela de pago';
        console.error(err);
      }
    },

    async processPayment(token) {
      try {
        this.isProcessing = true;
        this.error = null;

        // Simulación de petición al backend
        const response = await axios.post('/api/process-payment', {
          token,
          amount: Math.round(this.amount * 100), // Envía en centavos
        });

        if (response.data.success) {
          this.success = true;
          this.transactionId = response.data.transactionId;
        } else {
          this.error = response.data.message;
        }

      } catch (err) {
        this.error = err.response?.data?.message || 'Error procesando el pago';
      } finally {
        this.isProcessing = false;
      }
    },

    reset() {
      this.isProcessing = false;
      this.error = null;
      this.success = false;
      this.transactionId = null;
      this.amount = 0;
      this.kushki = null;
    }
  }
}) 