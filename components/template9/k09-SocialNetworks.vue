<template>
  <div class="content-SocialNet" :style="setting9Footer">
    <div class="icon-social">
      <div
        v-if="
          dataStore.redes.facebook != null && dataStore.redes.facebook != ''
        "
        class="icons-networks"
      >
        <a
          target="_blank"
          rel="noreferrer noopener"
          :href="dataStore.redes.facebook"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="100%"
            height="100%"
            x="0"
            y="0"
            viewBox="0 0 112.196 112.196"
            style="enable-background: new 0 0 512 512"
            xml:space="preserve"
            class="facebook-icon"
          >
            <circle
              class="circle-facebook circleBg"
              r="56.098"
              cx="56.098"
              cy="56.098"
              shape="circle"
              transform="matrix(0.8,0,0,0.8,11.219599914550777,11.219599914550777)"
            />
            <g
              transform="matrix(0.7,0,0,0.7,16.829399871826176,16.829399871826176)"
            >
              <g xmlns="http://www.w3.org/2000/svg">
                <circle
                  style=""
                  cx="56.098"
                  cy="56.098"
                  r="56.098"
                  fill="#2c2930"
                  data-original="#3b5998"
                  class="circle-facebook"
                />
                <path
                  style=""
                  d="M70.201,58.294h-10.01v36.672H45.025V58.294h-7.213V45.406h7.213v-8.34   c0-5.964,2.833-15.303,15.301-15.303L71.56,21.81v12.51h-8.151c-1.337,0-3.217,0.668-3.217,3.513v7.585h11.334L70.201,58.294z"
                  class="facebook-icon-circle iconBg"
                />
              </g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
            </g>
          </svg>
        </a>
      </div>
      <div
        v-if="dataStore.redes.twitter != null && dataStore.redes.twitter != ''"
        class="icons-networks"
      >
        <a
          target="_blank"
          rel="noreferrer noopener"
          :href="dataStore.redes.twitter"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="100%"
            height="100%"
            x="0"
            y="0"
            viewBox="0 0 112.197 112.197"
            style="enable-background: new 0 0 512 512"
            xml:space="preserve"
            class="twitter-icon"
          >
            <circle
              class="circle-twitter circleBg"
              r="56.0985"
              cx="56.0985"
              cy="56.0985"
              shape="circle"
              transform="matrix(0.8,0,0,0.8,11.21969985961914,11.21969985961914)"
            />
            <g
              transform="matrix(0.7,0,0,0.7,16.829699707031253,16.829399871826176)"
            >
              <g xmlns="http://www.w3.org/2000/svg">
                <circle
                  style=""
                  cx="56.099"
                  cy="56.098"
                  r="56.098"
                  fill="#2c2930"
                  data-original="#55acee"
                  class="circle-twitter"
                />
                <g>
                  <path
                    d="M90.461,40.316c-2.404,1.066-4.99,1.787-7.702,2.109c2.769-1.659,4.894-4.284,5.897-7.417    c-2.591,1.537-5.462,2.652-8.515,3.253c-2.446-2.605-5.931-4.233-9.79-4.233c-7.404,0-13.409,6.005-13.409,13.409    c0,1.051,0.119,2.074,0.349,3.056c-11.144-0.559-21.025-5.897-27.639-14.012c-1.154,1.98-1.816,4.285-1.816,6.742    c0,4.651,2.369,8.757,5.965,11.161c-2.197-0.069-4.266-0.672-6.073-1.679c-0.001,0.057-0.001,0.114-0.001,0.17    c0,6.497,4.624,11.916,10.757,13.147c-1.124,0.308-2.311,0.471-3.532,0.471c-0.866,0-1.705-0.083-2.523-0.239    c1.706,5.326,6.657,9.203,12.526,9.312c-4.59,3.597-10.371,5.74-16.655,5.74c-1.08,0-2.15-0.063-3.197-0.188    c5.931,3.806,12.981,6.025,20.553,6.025c24.664,0,38.152-20.432,38.152-38.153c0-0.581-0.013-1.16-0.039-1.734    C86.391,45.366,88.664,43.005,90.461,40.316L90.461,40.316z"
                    class="twitter-icon-circle iconBg"
                  />
                </g>
              </g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
            </g>
          </svg>
        </a>
      </div>
      <div
        v-if="
          dataStore.redes.instagram != null && dataStore.redes.instagram != ''
        "
        class="icons-networks"
      >
        <a
          target="_blank"
          rel="noreferrer noopener"
          :href="dataStore.redes.instagram"
          @mouseover="hover = true"
          @mouseleave="hover = false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="100%"
            height="100%"
            x="0"
            y="0"
            viewBox="0 0 512 512"
            style="enable-background: new 0 0 512 512"
            xml:space="preserve"
            class="instagram-icon"
          >
            <g v-if="!hover">
              <circle
                class="circle-instagram circleBg"
                r="256"
                cx="256"
                cy="256"
                shape="circle"
                transform="matrix(0.8,0,0,0.8,51.19999999999999,51.19999999999999)"
              />
            </g>
            <g v-if="hover">
              <circle
                class="circle-instagram"
                r="256"
                cx="256"
                cy="256"
                fill="url(#a)"
                data-original="#2c2930"
                shape="circle"
                transform="matrix(0.8,0,0,0.8,51.19999999999999,51.19999999999999)"
              />
              <linearGradient
                id="a"
                class="circle-instagram"
                xmlns="http://www.w3.org/2000/svg"
                gradientTransform="matrix(1 0 0 -1 0 -20854)"
                gradientUnits="userSpaceOnUse"
                x1="0"
                x2="512"
                y1="-21110"
                y2="-21110"
              >
                <stop stop-opacity="1" stop-color="#f5b300" offset="0" />
                <stop stop-opacity="1" stop-color="#ea00f3" offset="1" />
              </linearGradient>
            </g>
            <g
              transform="matrix(0.7,0,0,0.7,76.80000000000001,76.80000000000001)"
            >
              <linearGradient
                v-if="!hover"
                id="a"
                xmlns="http://www.w3.org/2000/svg"
                gradientTransform="matrix(1 0 0 -1 0 -20854)"
                gradientUnits="userSpaceOnUse"
                x1="0"
                x2="512"
                y1="-21110"
                y2="-21110"
              >
                <stop stop-opacity="1" stop-color="#2c2930" offset="1" />
                <stop stop-opacity="1" stop-color="#009eff" offset="1" />
              </linearGradient>
              <linearGradient
                v-if="hover"
                id="a"
                xmlns="http://www.w3.org/2000/svg"
                gradientTransform="matrix(1 0 0 -1 0 -20854)"
                gradientUnits="userSpaceOnUse"
                x1="0"
                x2="512"
                y1="-21110"
                y2="-21110"
              >
                <stop stop-opacity="1" stop-color="#2c2930" offset="0" />
                <stop stop-opacity="1" stop-color="#ea00f3" offset="1" />
              </linearGradient>

              <path
                class="circle-instagram"
                xmlns="http://www.w3.org/2000/svg"
                d="m512 256c0 141.386719-114.613281 256-256 256s-256-114.613281-256-256 114.613281-256 256-256 256 114.613281 256 256zm0 0"
                fill="url(#a)"
                data-original="url(#a)"
                style=""
              />

              <g xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m329.636719 433h-147.273438c-56.996093 0-103.363281-46.367188-103.363281-103.363281v-147.273438c0-56.996093 46.367188-103.363281 103.363281-103.363281h147.273438c56.996093 0 103.363281 46.367188 103.363281 103.363281v147.273438c0 56.996093-46.367188 103.363281-103.363281 103.363281zm-147.273438-324c-40.453125 0-73.363281 32.910156-73.363281 73.363281v147.273438c0 40.453125 32.910156 73.363281 73.363281 73.363281h147.273438c40.453125 0 73.363281-32.910156 73.363281-73.363281v-147.273438c0-40.453125-32.910156-73.363281-73.363281-73.363281zm0 0"
                  class="instagram-icon-circle iconBg"
                />
                <path
                  d="m256 352c-52.933594 0-96-43.066406-96-96s43.066406-96 96-96 96 43.066406 96 96-43.066406 96-96 96zm0-162c-36.394531 0-66 29.605469-66 66s29.605469 66 66 66 66-29.605469 66-66-29.605469-66-66-66zm0 0"
                  class="instagram-icon-circle iconBg"
                />
                <path
                  d="m365.832031 159.898438c0 7.582031-6.148437 13.730468-13.730469 13.730468-7.582031 0-13.730468-6.148437-13.730468-13.730468 0-7.582032 6.148437-13.730469 13.730468-13.730469 7.582032 0 13.730469 6.148437 13.730469 13.730469zm0 0"
                  class="instagram-icon-circle iconBg"
                />
              </g>
            </g>
          </svg>
        </a>
      </div>
      <div
        v-if="dataStore.redes.youtube != null && dataStore.redes.youtube != ''"
        class="icons-networks"
      >
        <a
          target="_blank"
          rel="noreferrer noopener"
          :href="dataStore.redes.youtube"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="100%"
            height="100%"
            x="0"
            y="0"
            viewBox="0 0 473.931 473.931"
            style="enable-background: new 0 0 512 512"
            xml:space="preserve"
            class="youtube-icon"
          >
            <circle
              class="circle-youtube circleBg"
              r="236.9655"
              cx="236.9655"
              cy="236.9655"
              shape="circle"
              transform="matrix(0.8,0,0,0.8,47.393099975585926,47.393099975585926)"
            />
            <g
              transform="matrix(0.7,0,0,0.7,71.08980102539064,71.08980102539064)"
            >
              <circle
                xmlns="http://www.w3.org/2000/svg"
                style=""
                cx="236.966"
                cy="236.966"
                r="236.966"
                fill="#2c2930"
                data-original="#d42428"
                class="circle-youtube"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                style=""
                d="M404.518,69.38c92.541,92.549,92.549,242.593,0,335.142c-92.541,92.541-242.593,92.545-335.142,0  L404.518,69.38z"
                fill="#2c2930"
                data-original="#cc202d"
                class="circle-youtube"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                style=""
                d="M469.168,284.426L351.886,167.148l-138.322,15.749l-83.669,129.532l156.342,156.338  C378.157,449.322,450.422,376.612,469.168,284.426z"
                fill="#2c2930"
                data-original="#ba202e"
                class="circle-youtube"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M360.971,191.238c0-19.865-16.093-35.966-35.947-35.966H156.372c-19.85,0-35.94,16.105-35.94,35.966  v96.444c0,19.865,16.093,35.966,35.94,35.966h168.649c19.858,0,35.947-16.105,35.947-35.966v-96.444H360.971z M216.64,280.146  v-90.584l68.695,45.294L216.64,280.146z"
                class="youtube-icon-circle iconBg"
              />
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
              <g xmlns="http://www.w3.org/2000/svg"></g>
            </g>
          </svg>
        </a>
      </div>
      <div
        v-if="dataStore.redes.tiktok != null && dataStore.redes.tiktok != ''"
        class="icons-networks"
      >
        <a
          target="_blank"
          rel="noreferrer noopener"
          :href="dataStore.redes.tiktok"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="28px"
            height="28px"
            viewBox="0 0 256 256"
            xml:space="preserve"
          >
            <g transform="translate(128 128) scale(0.72 0.72)">
              <g
                style="
                  stroke: none;
                  stroke-width: 0;
                  stroke-dasharray: none;
                  stroke-linecap: butt;
                  stroke-linejoin: miter;
                  stroke-miterlimit: 10;
                  opacity: 1;
                "
                class="circleBg"
                transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)"
              >
                <path
                  d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 72.039 33.277 v 6.758 c -3.187 0.001 -6.283 -0.623 -9.203 -1.855 c -1.878 -0.793 -3.627 -1.814 -5.227 -3.048 l 0.048 20.801 c -0.02 4.684 -1.873 9.085 -5.227 12.4 c -2.73 2.698 -6.188 4.414 -9.937 4.97 c -0.881 0.13 -1.777 0.197 -2.684 0.197 c -4.013 0 -7.823 -1.3 -10.939 -3.698 c -0.586 -0.452 -1.147 -0.941 -1.681 -1.468 c -3.635 -3.593 -5.509 -8.462 -5.194 -13.584 c 0.241 -3.899 1.802 -7.618 4.404 -10.532 c 3.443 -3.857 8.26 -5.998 13.41 -5.998 c 0.906 0 1.803 0.068 2.684 0.198 v 2.499 v 6.951 c -0.835 -0.275 -1.727 -0.427 -2.656 -0.427 c -4.705 0 -8.512 3.839 -8.442 8.548 c 0.045 3.013 1.69 5.646 4.118 7.098 c 1.141 0.682 2.453 1.105 3.853 1.182 c 1.097 0.06 2.151 -0.093 3.126 -0.415 c 3.362 -1.111 5.787 -4.268 5.787 -7.992 l 0.011 -13.93 V 16.5 h 9.307 c 0.009 0.922 0.103 1.822 0.276 2.694 c 0.702 3.529 2.692 6.591 5.46 8.678 c 2.414 1.821 5.42 2.9 8.678 2.9 c 0.002 0 0.029 0 0.027 -0.002 V 33.277 z"
                  style="
                    stroke: none;
                    stroke-width: 1;
                    stroke-dasharray: none;
                    stroke-linecap: butt;
                    stroke-linejoin: miter;
                    stroke-miterlimit: 10;
                    fill: rgb(0, 0, 0);
                    fill-rule: nonzero;
                    opacity: 1;
                  "
                  transform=" matrix(1 0 0 1 0 0) "
                  stroke-linecap="round"
                />
              </g>
            </g>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'K09SocialNetworks',
  props: {
    dataStore: {
      type: Object,
      required: true,
    },
    setting9Footer: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      hover: false,
    }
  },
  watch: {
    'dataStore.redes'() {
      this.links[0].link = this.dataStore.redes.facebook
      this.links[1].link = this.dataStore.redes.twitter
      this.links[2].link = this.dataStore.redes.instagram
      this.links[3].link = this.dataStore.redes.youtube
      this.links[4].link = this.dataStore.redes.tiktok
    },
  },
}
</script>
<style scoped>
.content-SocialNet {
  @apply w-full flex flex-row justify-center items-center mt-32 mb-20;
}
.icon-social {
  @apply w-auto flex flex-wrap justify-center items-center;
}
.icons-networks {
  margin-right: 1px;
  margin-left: 1px;
}
.facebook-icon,
.twitter-icon,
.instagram-icon,
.youtube-icon {
  width: 35px;
  height: 35px;
  /* cursor: pointer; */
}
.circle-twitter,
.twitter-icon-circle,
.circle-facebook,
.facebook-icon-circle,
.circle-youtube,
.youtube-icon-circle {
  transition: all 200ms ease-in;
}
.twitter-icon:hover .circle-twitter {
  transition: all 200ms ease-in;
  fill: #00acee;
}
.twitter-icon:hover .twitter-icon-circle {
  transition: all 200ms ease-in;
  fill: #ffffff;
}
.facebook-icon:hover .circle-facebook {
  transition: all 200ms ease-in;
  fill: #3b5998;
}
.facebook-icon:hover .facebook-icon-circle {
  transition: all 200ms ease-in;
  fill: #ffffff;
}
.youtube-icon:hover .circle-youtube {
  transition: all 200ms ease-in;
  fill: #f61c0d;
}
.youtube-icon:hover .youtube-icon-circle {
  transition: all 200ms ease-in;
  fill: #ffffff;
}
.circle-instagram,
.instagram-icon-circle {
  transition: all 200ms ease-in;
}
.instagram-icon:hover .instagram-icon-circle {
  transition: all 200ms ease-in;
  fill: #ffffff;
}
.circleBg {
  fill: var(--color_icon_bg);
}
.iconBg {
  fill: var(--color_icon);
}
</style>
