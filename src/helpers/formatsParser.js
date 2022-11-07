export const parseAmountToCurrency = (amount) =>
  amount.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS'
  })
