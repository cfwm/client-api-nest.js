import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import pt from 'vuetify/es5/locale/pt'

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { pt },
    current: 'pt'
  },
  theme: {
    themes: {
      light: {
        primary: '#e2b874',
        secondary: '#152e3e',
        bgTrHover: '#f9fafb',
        bgButton: '#edeeef',
        background: '#dfe3e6',
        error: '#d83636'
      }
    }
  },
  options: {
    customProperties: true
  }
});
