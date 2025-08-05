export default {
  methods: {
    expiredDate(date) {
      Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf())
        date.setDate(date.getDate() + days)
        return date
      }
      if (date == null) {
        return true
      } else {
        let x = date
        let d1 = new Date()
        let d2 = new Date(x)
        //Vencido
        if (d1 > this.sumarDias(d2, 3)) {
          return false
        }
        //Activo
        else {
          return true
        }
      }
    },
    sumarDias(fecha, date) {
      fecha.setDate(fecha.getDate() + date)
      return fecha
    },
  },
}
