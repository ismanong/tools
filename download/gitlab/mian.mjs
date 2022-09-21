
import 'https://unpkg.com/vue@2/dist/vue.js';

// element-ui
import 'https://unpkg.com/element-ui@2/lib/index.js';
// import 'https://unpkg.com/element-ui@2/lib/theme-chalk/index.css';
// <link rel="stylesheet" href="https://unpkg.com/element-ui@2/lib/theme-chalk/index.css">
// element-ui end

// Filepond
// <link href="https://unpkg.com/filepond/dist/filepond.css" rel="stylesheet">
import 'https://unpkg.com/filepond/dist/filepond.js';
import 'https://unpkg.com/filepond-plugin-file-validate-size/dist/filepond-plugin-file-validate-size.js';
// Filepond end

// axios官方没有esm版本
// import 'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.js';
import axios from 'https://cdn.jsdelivr.net/npm/@bundled-es-modules/axios@0.27.2/axios.js';

// import 'https://cdn.jsdelivr.net/gh/chenquincy/app-info-parser/dist/app-info-parser.min.js';
// import 'https://cdn.jsdelivr.net/npm/qrcodejs2@0.0.2/qrcode.min.js';

customElements.define('gitlab-download-dir',
  class extends HTMLElement {
    // Specify observed attributes so that
    // attributeChangedCallback will work
    // static get observedAttributes() {
    //   return ['c', 'l'];
    // }
    get dir() {
      return this.getAttribute('dir') || '';
    }
    get host() {
      return this.getAttribute('host') || '';
    }
    get gitlabPrivateToken() {
      return this.getAttribute('gitlab-private-token') || '';
    }
    get gitlabHost() {
      return this.getAttribute('gitlab-host') || '';
    }
    constructor() {
      super();
      const shadowRoot = this.attachShadow({mode: 'open'});
      const template = document.createElement('div');
      template.innerHTML = `
          <link rel="stylesheet" href="https://unpkg.com/element-ui@2/lib/theme-chalk/index.css">
          <link href="https://unpkg.com/filepond/dist/filepond.css" rel="stylesheet">
          <style>
              .filepond--root .filepond--drop-label {
                  min-height: 10em !important;
              }
          </style>
          
          <!-- ------------------------------------------------分割线------------------------------------------------ -->

          <div id="app">
          <div id="qrcodeImage" style="position: fixed;">
              <!-- <p class="scan-tips">扫描二维码下载<br>或用手机浏览器输入这个网址:&nbsp;&nbsp;<span>http://apps-qa.com/app-download-assets/download.html</span></p> -->
          </div>

          <h1 style="padding-top: 30px;">Git上传/应用分发</h1>
          <a style="color:#999;font-size:12px;" href="https://gitlab.com/desktop/apps-dl.com/-/tree/release"> </a>

          <div style="padding: 20px;">
              <template>
                  <el-table :data="gitTreeData" style="width: 100%" border>
                      <el-table-column prop="name" label="目录" width="150"> </el-table-column>
                      <el-table-column prop="path" label="路径" width="250"> </el-table-column>
                      <el-table-column label="最新">
                          <template slot-scope="scope">
                              <el-link type="primary" :href="scope.row.url">{{scope.row.url}}</el-link>
                          </template>
                      </el-table-column>
                  </el-table>
              </template>
          </div>

          <!-- Filepond input-->
          <div>
              <input type="file" class="filepond" name="filepond" multiple data-allow-reorder="true" data-max-file-size="100MB" data-max-files="3" style="min-height: 300px;">
          </div>


          <!-- <div class="package-list">
              <div class="package-list-item" v-for="item in dataJsonList">
                  <img style="width: 120px;height: 120px;border-radius: 17.54%;" :src="item.icon">
                  <div style="font-size: 20px;">{{item.name}}-{{item.env}}</div>
                  <div style="margin: 10px 0 20px;padding-top: 10px;border-top: 1px solid #DAE2E3;">
                      <p><i :class="{item.type}-label"></i></p>
                      <p>{{item.version}}</p>
                      <p style="color:#999;font-size:12px;">{{item.size}}</p>
                      <p style="color:#999;font-size:12px;">更新时间：{{item.update_time}}</p>
                  </div>
                  <a :href="item.url"
                      style="width: 120px;color: #fff;background-color:#009f95;display: inline-block;text-decoration: none;height: 42px;line-height: 42px;border: 1px solid #e1e1e1;border-radius: 25px;">下载安装</a>
              </div>
          </div> -->
          <!-- <ul style="text-align: left;list-style: none;">
              <li style="color: red;">* 确认安装后，请按 Home 键在桌面查看</p>
              <li style="color: red;">* ipa地址必须https</p>
          </ul> -->
      </div>
      `;
      // appending the container to the shadow DOM
      shadowRoot.appendChild(template);
    }

    connectedCallback() {
      console.log('Custom square element added to page.');
      loadSctipt(this);
      // updateStyle(this);
    }

    disconnectedCallback() {
      console.log('Custom square element removed from page.');
    }

    adoptedCallback() {
      console.log('Custom square element moved to new page.');
    }

    attributeChangedCallback(name, oldValue, newValue) {
      console.log('Custom square element attributes changed.');
      // updateStyle(this);
    }
  }
);
function loadSctipt(elem) {
  const shadowRoot = elem.shadowRoot;
  // get attribute values from getters
  const targetDir = elem.dir;
  const host = elem.host;
  const gitlabPrivateToken = elem.gitlabPrivateToken;
  const gitlabHost = elem.gitlabHost;
  new Vue({
    el: shadowRoot.getElementById('app'),
    data() {
        return {
            gitTreeData: [],
            dataJsonList: [],
            dataJson: {},
        }
    },
    methods: {
        // clickDownload(item){
        //     if(item.type === 'apk'){
        //         let path = encodeURIComponent(`app-archives/app-${item.env}.apk`)
        //         location.href = `https://gitlab.com/api/v4/projects/3358/repository/files/${path}/raw?ref=develop&private_token=`
        //     }
        //     if(item.type === 'ipa'){
        //         location.href = item.url
        //     }
        // },
        // loading
        loadingUtil() {
            // let getBgLoading = () => {
            //     let base64Image = 'background-size: cover;'
            //     base64Image += "background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0ibWFyZ2luOiBhdXRvOyBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsgZGlzcGxheTogYmxvY2s7IHNoYXBlLXJlbmRlcmluZzogYXV0bzsiIHdpZHRoPSIyMDBweCIgaGVpZ2h0PSIyMDBweCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIj4NCg0KICAgIDxnPg0KICAgICAgICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgdmFsdWVzPSIzNjAgNTAgNTA7MCA1MCA1MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGNhbGNNb2RlPSJzcGxpbmUiIGtleVNwbGluZXM9IjAuNSAwIDAuNSAxIiBiZWdpbj0iLTAuMXMiPjwvYW5pbWF0ZVRyYW5zZm9ybT4NCiAgICAgICAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMzkuODkxIiBzdHJva2U9IiNmZmMyNTQiIHN0cm9rZS13aWR0aD0iMTQuNCIgZmlsbD0ibm9uZSIgc3Ryb2tlLWRhc2hhcnJheT0iMCAzMDAiPg0KICAgICAgICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ic3Ryb2tlLWRhc2hhcnJheSIgdmFsdWVzPSIxNSAzMDA7NTUuMTQxMzU5OTE5NTE0MiAzMDA7MTUgMzAwIiBrZXlUaW1lcz0iMDswLjU7MSIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGNhbGNNb2RlPSJsaW5lYXIiIGtleVNwbGluZXM9IjAgMC40IDAuNiAxOzAuNCAwIDEgMC42IiBiZWdpbj0iLTAuMDQ2cyI+PC9hbmltYXRlPg0KICAgICAgICA8L2NpcmNsZT4NCiAgICAgICAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMzkuODkxIiBzdHJva2U9IiNmZmYxY2YiIHN0cm9rZS13aWR0aD0iNy4yIiBmaWxsPSJub25lIiBzdHJva2UtZGFzaGFycmF5PSIwIDMwMCI+DQogICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJzdHJva2UtZGFzaGFycmF5IiB2YWx1ZXM9IjE1IDMwMDs1NS4xNDEzNTk5MTk1MTQyIDMwMDsxNSAzMDAiIGtleVRpbWVzPSIwOzAuNTsxIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgY2FsY01vZGU9ImxpbmVhciIga2V5U3BsaW5lcz0iMCAwLjQgMC42IDE7MC40IDAgMSAwLjYiIGJlZ2luPSItMC4wNDZzIj48L2FuaW1hdGU+DQogICAgICAgIDwvY2lyY2xlPg0KICAgICAgICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIzMi43NzEiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBzdHJva2UtZGFzaGFycmF5PSIwIDMwMCI+DQogICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJzdHJva2UtZGFzaGFycmF5IiB2YWx1ZXM9IjE1IDMwMDs0NS4yOTkzNzg0NTQzNDgwOTQgMzAwOzE1IDMwMCIga2V5VGltZXM9IjA7MC41OzEiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ibGluZWFyIiBrZXlTcGxpbmVzPSIwIDAuNCAwLjYgMTswLjQgMCAxIDAuNiIgYmVnaW49Ii0wLjA0NnMiPjwvYW5pbWF0ZT4NCiAgICAgICAgPC9jaXJjbGU+DQogICAgICAgIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjQ3LjE3MSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIHN0cm9rZS1kYXNoYXJyYXk9IjAgMzAwIj4NCiAgICAgICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InN0cm9rZS1kYXNoYXJyYXkiIHZhbHVlcz0iMTUgMzAwOzY2LjAzMzg4OTk2ODA0MDczIDMwMDsxNSAzMDAiIGtleVRpbWVzPSIwOzAuNTsxIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgY2FsY01vZGU9ImxpbmVhciIga2V5U3BsaW5lcz0iMCAwLjQgMC42IDE7MC40IDAgMSAwLjYiIGJlZ2luPSItMC4wNDZzIj48L2FuaW1hdGU+DQogICAgICAgIDwvY2lyY2xlPg0KICAgIDwvZz4NCiAgICA8Zz4NCiAgICAgICAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIHZhbHVlcz0iMzYwIDUwIDUwOzAgNTAgNTAiIGtleVRpbWVzPSIwOzEiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlTcGxpbmVzPSIwLjUgMCAwLjUgMSI+PC9hbmltYXRlVHJhbnNmb3JtPg0KDQogICAgICAgIDxwYXRoIGZpbGw9IiNmZmMyNTQiIHN0cm9rZT0iIzAwMDAwMCIgZD0iTTk3LjIsNTBjMCw2LjEtMS4yLDEyLjItMy41LDE3LjhsLTEzLjMtNS40YzEuNi0zLjksMi40LTguMiwyLjQtMTIuNCI+PC9wYXRoPg0KICAgICAgICA8cGF0aCBmaWxsPSIjZmZmMWNmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC0wLjEpIiBkPSJNOTMuNiw1MGMwLDEuMiwwLDIuNC0wLjEsMy42TDkzLDU3LjJjLTAuNCwyLTIuMywzLjMtNC4yLDIuOGwtMC4yLTAuMWMtMS44LTAuNS0zLjEtMi4zLTIuNy0zLjlsMC40LTMgYzAuMS0xLDAuMS0yLDAuMS0zIj48L3BhdGg+DQogICAgICAgIDxwYXRoIGZpbGw9IiNmZmMyNTQiIHN0cm9rZT0iIzAwMDAwMCIgZD0iTTg1LjQsNjIuNWMtMC4yLDAuNy0wLjUsMS40LTAuOCwyLjFjLTAuMywwLjctMC42LDEuNC0wLjksMmMtMC42LDEuMS0yLDEuNC0zLjIsMC44djBjLTEuMS0wLjctMS43LTItMS4yLTIuOSBjMC4zLTAuNiwwLjUtMS4yLDAuOC0xLjhjMC4yLTAuNiwwLjYtMS4yLDAuNy0xLjgiPjwvcGF0aD4NCiAgICAgICAgPHBhdGggZmlsbD0iI2ZmYzI1NCIgc3Ryb2tlPSIjMDAwMDAwIiBkPSJNOTQuNSw2NS43Yy0wLjMsMC45LTAuNywxLjctMSwyLjZjLTAuNCwwLjgtMC43LDEuNy0xLjEsMi41Yy0wLjcsMS40LTIuMywxLjktMy40LDEuM2wwLDAgYy0xLjEtMC43LTEuNS0yLjItMC45LTMuNGMwLjQtMC44LDAuNy0xLjUsMS0yLjNjMC4zLTAuOCwwLjctMS41LDAuOS0yLjMiPjwvcGF0aD4NCiAgICAgICAgPHBhdGggZmlsbD0iI2ZmYzI1NCIgc3Ryb2tlPSIjMDAwMDAwIiBkPSJNODUuNiw2N2MwLDAuOCwwLjEsMS42LDAuMywyLjRjMC42LTAuNSwxLjEtMSwxLjQtMS43YzAuMi0wLjcsMC4yLTEuNS0wLjEtMi4yQzg2LjUsNjQsODUuNiw2Ni4zLDg1LjYsNjd6Ij48L3BhdGg+DQoNCiAgICA8L2c+DQogICAgPGc+DQogICAgICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiB2YWx1ZXM9IjM2MCA1MCA1MDswIDUwIDUwIiBrZXlUaW1lcz0iMDsxIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgY2FsY01vZGU9InNwbGluZSIga2V5U3BsaW5lcz0iMC41IDAgMC41IDEiIGJlZ2luPSItMC4xcyI+PC9hbmltYXRlVHJhbnNmb3JtPg0KDQogICAgICAgIDxwYXRoIGZpbGw9IiNmZmYxY2YiIHN0cm9rZT0iIzAwMDAwMCIgZD0iTTkxLDMzLjZsLTEwLDRjLTAuNC0xLjItMS4xLTIuNC0xLjctMy41Yy0wLjItMC41LDAuMy0xLjEsMC45LTFDODMuNiwzMi45LDg3LjQsMzIuOSw5MSwzMy42eiI+PC9wYXRoPg0KICAgICAgICA8cGF0aCBmaWxsPSIjZmZmMWNmIiBzdHJva2U9IiMwMDAwMDAiIGQ9Ik04My4yLDM2LjdsMTAtNGMtMC42LTEuNy0xLjUtMy4zLTIuMy00LjljLTAuMy0wLjctMS4yLTAuNi0xLjQsMC4xQzg3LjYsMzEuMSw4NS43LDM0LDgzLjIsMzYuN3oiPjwvcGF0aD4NCiAgICAgICAgPHBhdGggZmlsbD0iI2ZmYzI1NCIgc3Ryb2tlPSIjMDAwMDAwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDAuMikiIGQ9Ik04Mi44LDUwYzAtMy40LTAuNS02LjgtMS41LTEwYy0wLjItMC44LTAuNC0xLjUtMC4zLTIuM2MwLjEtMC44LDAuNC0xLjYsMC43LTIuNGMwLjctMS41LDEuOS0zLjEsMy43LTRsMCwwIGMxLjgtMC45LDMuNy0xLDUuNi0wLjNjMC45LDAuNCwxLjcsMSwyLjQsMS44YzAuNywwLjgsMS4zLDEuNywxLjcsMi44YzEuNSw0LjYsMi4yLDkuNSwyLjIsMTQuNCI+PC9wYXRoPg0KICAgICAgICA8cGF0aCBmaWxsPSIjZmZmMWNmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDAuMykiIGQ9Ik04Ni40LDUwbDAtMC45bC0wLjEtMC45bC0wLjEtMS45YzAtMC45LDAuMi0xLjcsMC43LTIuM2MwLjUtMC43LDEuMy0xLjIsMi4zLTEuNGwwLjMsMGMwLjktMC4yLDEuOSwwLDIuNiwwLjYgYzAuNywwLjUsMS4zLDEuNCwxLjQsMi40bDAuMiwyLjJsMC4xLDEuMWwwLDEuMSI+PC9wYXRoPg0KICAgICAgICA8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNODguNiwzNi42YzAuMSwwLjMtMC4yLDAuNy0wLjYsMC44Yy0wLjUsMC4yLTAuOSwwLTEuMS0wLjNjLTAuMS0wLjMsMC4yLTAuNywwLjYtMC44Qzg4LDM2LjEsODguNSwzNi4yLDg4LjYsMzYuNnoiPjwvcGF0aD4NCiAgICAgICAgPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBkPSJNODYsMzguN2MwLjIsMC42LDAuOCwwLjksMS40LDAuN2MwLjYtMC4yLDAuOS0wLjksMC42LTIuMWMwLjMsMS4yLDEsMS43LDEuNiwxLjVjMC42LTAuMiwwLjktMC44LDAuOC0xLjQiPjwvcGF0aD4NCiAgICAgICAgPHBhdGggZmlsbD0iI2ZmYzI1NCIgc3Ryb2tlPSIjMDAwMDAwIiBkPSJNODYuOCw0Mi4ybDAuNCwyLjJjMC4xLDAuNCwwLjEsMC43LDAuMiwxLjFsMC4xLDEuMWMwLjEsMS4yLTAuOSwyLjMtMi4yLDIuM2gwYy0xLjMsMC0yLjUtMC44LTIuNS0xLjlsLTAuMS0xIGMwLTAuMy0wLjEtMC42LTAuMi0xbC0wLjMtMS45Ij48L3BhdGg+DQogICAgICAgIDxwYXRoIGZpbGw9IiNmZmMyNTQiIHN0cm9rZT0iIzAwMDAwMCIgZD0iTTk2LjIsNDAuMmwwLjUsMi43YzAuMSwwLjUsMC4yLDAuOSwwLjIsMS40bDAuMSwxLjRjMC4xLDEuNS0wLjksMi44LTIuMiwyLjhjLTEuMywwLTIuNS0xLjEtMi42LTIuNGwtMC4xLTEuMiBjMC0wLjQtMC4xLTAuOC0wLjItMS4ybC0wLjQtMi41Ij48L3BhdGg+DQogICAgICAgIDxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgZD0iTTkwLjksMzYuNGMxLjEtMS4xLDIuNy0xLjYsNC4zLTEuOSI+PC9wYXRoPg0KICAgICAgICA8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIGQ9Ik05MS42LDM3LjVjMS4zLTAuNSwyLjgtMC44LDQuMi0wLjciPjwvcGF0aD4NCiAgICAgICAgPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBkPSJNOTEuNywzOC44YzAuMi0wLjEsMC40LTAuMSwwLjctMC4xYzEuMi0wLjEsMi41LDAsMy44LDAuMyI+PC9wYXRoPg0KICAgICAgICA8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIGQ9Ik04NSwzOC40Yy0xLjYtMC4xLTMuMSwwLjYtNC42LDEuMiI+PC9wYXRoPg0KICAgICAgICA8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIGQ9Ik04NSwzOS41Yy0xLjQsMC4zLTIuOCwwLjktNCwxLjYiPjwvcGF0aD4NCiAgICAgICAgPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBkPSJNODUuNSw0MC40Yy0wLjIsMC0wLjQsMC4xLTAuNywwLjJjLTEuMSwwLjUtMi4yLDEuMS0zLjIsMS44Ij48L3BhdGg+DQogICAgICAgIDxwYXRoIGZpbGw9IiNmZjdiYWMiIGQ9Ik05Mi44LDM0LjJjMC4xLDAuMy0wLjMsMC44LTAuOSwxYy0wLjYsMC4yLTEuMiwwLjEtMS40LTAuMmMtMC4xLTAuMywwLjMtMC44LDAuOS0xIEM5Mi4xLDMzLjgsOTIuNywzMy45LDkyLjgsMzQuMnoiPjwvcGF0aD4NCiAgICAgICAgPHBhdGggZmlsbD0iI2ZmN2JhYyIgZD0iTTgyLjIsMzguMmMwLjEsMC4zLDAuNywwLjMsMS4zLDAuMWMwLjYtMC4yLDEtMC42LDAuOS0wLjljLTAuMS0wLjMtMC43LTAuMy0xLjMtMC4xIEM4Mi41LDM3LjUsODIsMzcuOSw4Mi4yLDM4LjJ6Ij48L3BhdGg+DQogICAgICAgIDxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik05MCwzNS43TDg5LjMsMzZsLTAuMy0wLjdjLTAuMy0wLjksMC4xLTEuOSwwLjktMi4zbDAuNy0wLjNsMC4zLDAuN0M5MS4zLDM0LjQsOTAuOSwzNS40LDkwLDM1Ljd6Ij48L3BhdGg+DQogICAgICAgIDxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik04NS4zLDM3LjRsMC43LTAuMmwtMC4yLTAuNmMtMC4zLTAuOC0xLjMtMS4yLTIuMS0wLjhMODIuOSwzNmwwLjIsMC42QzgzLjUsMzcuNCw4NC40LDM3LjcsODUuMywzNy40eiI+PC9wYXRoPg0KDQogICAgPC9nPg0KICAgIDwhLS0gW2xkaW9dIGdlbmVyYXRlZCBieSBodHRwczovL2xvYWRpbmcuaW8vIC0tPjwvc3ZnPg==');"
            //     return base64Image;
            // }
            const bgLoading = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0ibWFyZ2luOiBhdXRvOyBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsgZGlzcGxheTogYmxvY2s7IHNoYXBlLXJlbmRlcmluZzogYXV0bzsiIHdpZHRoPSIyMDBweCIgaGVpZ2h0PSIyMDBweCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIj4NCg0KICAgIDxnPg0KICAgICAgICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgdmFsdWVzPSIzNjAgNTAgNTA7MCA1MCA1MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGNhbGNNb2RlPSJzcGxpbmUiIGtleVNwbGluZXM9IjAuNSAwIDAuNSAxIiBiZWdpbj0iLTAuMXMiPjwvYW5pbWF0ZVRyYW5zZm9ybT4NCiAgICAgICAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMzkuODkxIiBzdHJva2U9IiNmZmMyNTQiIHN0cm9rZS13aWR0aD0iMTQuNCIgZmlsbD0ibm9uZSIgc3Ryb2tlLWRhc2hhcnJheT0iMCAzMDAiPg0KICAgICAgICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ic3Ryb2tlLWRhc2hhcnJheSIgdmFsdWVzPSIxNSAzMDA7NTUuMTQxMzU5OTE5NTE0MiAzMDA7MTUgMzAwIiBrZXlUaW1lcz0iMDswLjU7MSIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGNhbGNNb2RlPSJsaW5lYXIiIGtleVNwbGluZXM9IjAgMC40IDAuNiAxOzAuNCAwIDEgMC42IiBiZWdpbj0iLTAuMDQ2cyI+PC9hbmltYXRlPg0KICAgICAgICA8L2NpcmNsZT4NCiAgICAgICAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMzkuODkxIiBzdHJva2U9IiNmZmYxY2YiIHN0cm9rZS13aWR0aD0iNy4yIiBmaWxsPSJub25lIiBzdHJva2UtZGFzaGFycmF5PSIwIDMwMCI+DQogICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJzdHJva2UtZGFzaGFycmF5IiB2YWx1ZXM9IjE1IDMwMDs1NS4xNDEzNTk5MTk1MTQyIDMwMDsxNSAzMDAiIGtleVRpbWVzPSIwOzAuNTsxIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgY2FsY01vZGU9ImxpbmVhciIga2V5U3BsaW5lcz0iMCAwLjQgMC42IDE7MC40IDAgMSAwLjYiIGJlZ2luPSItMC4wNDZzIj48L2FuaW1hdGU+DQogICAgICAgIDwvY2lyY2xlPg0KICAgICAgICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIzMi43NzEiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBzdHJva2UtZGFzaGFycmF5PSIwIDMwMCI+DQogICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJzdHJva2UtZGFzaGFycmF5IiB2YWx1ZXM9IjE1IDMwMDs0NS4yOTkzNzg0NTQzNDgwOTQgMzAwOzE1IDMwMCIga2V5VGltZXM9IjA7MC41OzEiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ibGluZWFyIiBrZXlTcGxpbmVzPSIwIDAuNCAwLjYgMTswLjQgMCAxIDAuNiIgYmVnaW49Ii0wLjA0NnMiPjwvYW5pbWF0ZT4NCiAgICAgICAgPC9jaXJjbGU+DQogICAgICAgIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjQ3LjE3MSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIHN0cm9rZS1kYXNoYXJyYXk9IjAgMzAwIj4NCiAgICAgICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InN0cm9rZS1kYXNoYXJyYXkiIHZhbHVlcz0iMTUgMzAwOzY2LjAzMzg4OTk2ODA0MDczIDMwMDsxNSAzMDAiIGtleVRpbWVzPSIwOzAuNTsxIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgY2FsY01vZGU9ImxpbmVhciIga2V5U3BsaW5lcz0iMCAwLjQgMC42IDE7MC40IDAgMSAwLjYiIGJlZ2luPSItMC4wNDZzIj48L2FuaW1hdGU+DQogICAgICAgIDwvY2lyY2xlPg0KICAgIDwvZz4NCiAgICA8Zz4NCiAgICAgICAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIHZhbHVlcz0iMzYwIDUwIDUwOzAgNTAgNTAiIGtleVRpbWVzPSIwOzEiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlTcGxpbmVzPSIwLjUgMCAwLjUgMSI+PC9hbmltYXRlVHJhbnNmb3JtPg0KDQogICAgICAgIDxwYXRoIGZpbGw9IiNmZmMyNTQiIHN0cm9rZT0iIzAwMDAwMCIgZD0iTTk3LjIsNTBjMCw2LjEtMS4yLDEyLjItMy41LDE3LjhsLTEzLjMtNS40YzEuNi0zLjksMi40LTguMiwyLjQtMTIuNCI+PC9wYXRoPg0KICAgICAgICA8cGF0aCBmaWxsPSIjZmZmMWNmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC0wLjEpIiBkPSJNOTMuNiw1MGMwLDEuMiwwLDIuNC0wLjEsMy42TDkzLDU3LjJjLTAuNCwyLTIuMywzLjMtNC4yLDIuOGwtMC4yLTAuMWMtMS44LTAuNS0zLjEtMi4zLTIuNy0zLjlsMC40LTMgYzAuMS0xLDAuMS0yLDAuMS0zIj48L3BhdGg+DQogICAgICAgIDxwYXRoIGZpbGw9IiNmZmMyNTQiIHN0cm9rZT0iIzAwMDAwMCIgZD0iTTg1LjQsNjIuNWMtMC4yLDAuNy0wLjUsMS40LTAuOCwyLjFjLTAuMywwLjctMC42LDEuNC0wLjksMmMtMC42LDEuMS0yLDEuNC0zLjIsMC44djBjLTEuMS0wLjctMS43LTItMS4yLTIuOSBjMC4zLTAuNiwwLjUtMS4yLDAuOC0xLjhjMC4yLTAuNiwwLjYtMS4yLDAuNy0xLjgiPjwvcGF0aD4NCiAgICAgICAgPHBhdGggZmlsbD0iI2ZmYzI1NCIgc3Ryb2tlPSIjMDAwMDAwIiBkPSJNOTQuNSw2NS43Yy0wLjMsMC45LTAuNywxLjctMSwyLjZjLTAuNCwwLjgtMC43LDEuNy0xLjEsMi41Yy0wLjcsMS40LTIuMywxLjktMy40LDEuM2wwLDAgYy0xLjEtMC43LTEuNS0yLjItMC45LTMuNGMwLjQtMC44LDAuNy0xLjUsMS0yLjNjMC4zLTAuOCwwLjctMS41LDAuOS0yLjMiPjwvcGF0aD4NCiAgICAgICAgPHBhdGggZmlsbD0iI2ZmYzI1NCIgc3Ryb2tlPSIjMDAwMDAwIiBkPSJNODUuNiw2N2MwLDAuOCwwLjEsMS42LDAuMywyLjRjMC42LTAuNSwxLjEtMSwxLjQtMS43YzAuMi0wLjcsMC4yLTEuNS0wLjEtMi4yQzg2LjUsNjQsODUuNiw2Ni4zLDg1LjYsNjd6Ij48L3BhdGg+DQoNCiAgICA8L2c+DQogICAgPGc+DQogICAgICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiB2YWx1ZXM9IjM2MCA1MCA1MDswIDUwIDUwIiBrZXlUaW1lcz0iMDsxIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgY2FsY01vZGU9InNwbGluZSIga2V5U3BsaW5lcz0iMC41IDAgMC41IDEiIGJlZ2luPSItMC4xcyI+PC9hbmltYXRlVHJhbnNmb3JtPg0KDQogICAgICAgIDxwYXRoIGZpbGw9IiNmZmYxY2YiIHN0cm9rZT0iIzAwMDAwMCIgZD0iTTkxLDMzLjZsLTEwLDRjLTAuNC0xLjItMS4xLTIuNC0xLjctMy41Yy0wLjItMC41LDAuMy0xLjEsMC45LTFDODMuNiwzMi45LDg3LjQsMzIuOSw5MSwzMy42eiI+PC9wYXRoPg0KICAgICAgICA8cGF0aCBmaWxsPSIjZmZmMWNmIiBzdHJva2U9IiMwMDAwMDAiIGQ9Ik04My4yLDM2LjdsMTAtNGMtMC42LTEuNy0xLjUtMy4zLTIuMy00LjljLTAuMy0wLjctMS4yLTAuNi0xLjQsMC4xQzg3LjYsMzEuMSw4NS43LDM0LDgzLjIsMzYuN3oiPjwvcGF0aD4NCiAgICAgICAgPHBhdGggZmlsbD0iI2ZmYzI1NCIgc3Ryb2tlPSIjMDAwMDAwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDAuMikiIGQ9Ik04Mi44LDUwYzAtMy40LTAuNS02LjgtMS41LTEwYy0wLjItMC44LTAuNC0xLjUtMC4zLTIuM2MwLjEtMC44LDAuNC0xLjYsMC43LTIuNGMwLjctMS41LDEuOS0zLjEsMy43LTRsMCwwIGMxLjgtMC45LDMuNy0xLDUuNi0wLjNjMC45LDAuNCwxLjcsMSwyLjQsMS44YzAuNywwLjgsMS4zLDEuNywxLjcsMi44YzEuNSw0LjYsMi4yLDkuNSwyLjIsMTQuNCI+PC9wYXRoPg0KICAgICAgICA8cGF0aCBmaWxsPSIjZmZmMWNmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDAuMykiIGQ9Ik04Ni40LDUwbDAtMC45bC0wLjEtMC45bC0wLjEtMS45YzAtMC45LDAuMi0xLjcsMC43LTIuM2MwLjUtMC43LDEuMy0xLjIsMi4zLTEuNGwwLjMsMGMwLjktMC4yLDEuOSwwLDIuNiwwLjYgYzAuNywwLjUsMS4zLDEuNCwxLjQsMi40bDAuMiwyLjJsMC4xLDEuMWwwLDEuMSI+PC9wYXRoPg0KICAgICAgICA8cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNODguNiwzNi42YzAuMSwwLjMtMC4yLDAuNy0wLjYsMC44Yy0wLjUsMC4yLTAuOSwwLTEuMS0wLjNjLTAuMS0wLjMsMC4yLTAuNywwLjYtMC44Qzg4LDM2LjEsODguNSwzNi4yLDg4LjYsMzYuNnoiPjwvcGF0aD4NCiAgICAgICAgPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBkPSJNODYsMzguN2MwLjIsMC42LDAuOCwwLjksMS40LDAuN2MwLjYtMC4yLDAuOS0wLjksMC42LTIuMWMwLjMsMS4yLDEsMS43LDEuNiwxLjVjMC42LTAuMiwwLjktMC44LDAuOC0xLjQiPjwvcGF0aD4NCiAgICAgICAgPHBhdGggZmlsbD0iI2ZmYzI1NCIgc3Ryb2tlPSIjMDAwMDAwIiBkPSJNODYuOCw0Mi4ybDAuNCwyLjJjMC4xLDAuNCwwLjEsMC43LDAuMiwxLjFsMC4xLDEuMWMwLjEsMS4yLTAuOSwyLjMtMi4yLDIuM2gwYy0xLjMsMC0yLjUtMC44LTIuNS0xLjlsLTAuMS0xIGMwLTAuMy0wLjEtMC42LTAuMi0xbC0wLjMtMS45Ij48L3BhdGg+DQogICAgICAgIDxwYXRoIGZpbGw9IiNmZmMyNTQiIHN0cm9rZT0iIzAwMDAwMCIgZD0iTTk2LjIsNDAuMmwwLjUsMi43YzAuMSwwLjUsMC4yLDAuOSwwLjIsMS40bDAuMSwxLjRjMC4xLDEuNS0wLjksMi44LTIuMiwyLjhjLTEuMywwLTIuNS0xLjEtMi42LTIuNGwtMC4xLTEuMiBjMC0wLjQtMC4xLTAuOC0wLjItMS4ybC0wLjQtMi41Ij48L3BhdGg+DQogICAgICAgIDxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgZD0iTTkwLjksMzYuNGMxLjEtMS4xLDIuNy0xLjYsNC4zLTEuOSI+PC9wYXRoPg0KICAgICAgICA8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIGQ9Ik05MS42LDM3LjVjMS4zLTAuNSwyLjgtMC44LDQuMi0wLjciPjwvcGF0aD4NCiAgICAgICAgPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBkPSJNOTEuNywzOC44YzAuMi0wLjEsMC40LTAuMSwwLjctMC4xYzEuMi0wLjEsMi41LDAsMy44LDAuMyI+PC9wYXRoPg0KICAgICAgICA8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIGQ9Ik04NSwzOC40Yy0xLjYtMC4xLTMuMSwwLjYtNC42LDEuMiI+PC9wYXRoPg0KICAgICAgICA8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIGQ9Ik04NSwzOS41Yy0xLjQsMC4zLTIuOCwwLjktNCwxLjYiPjwvcGF0aD4NCiAgICAgICAgPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBkPSJNODUuNSw0MC40Yy0wLjIsMC0wLjQsMC4xLTAuNywwLjJjLTEuMSwwLjUtMi4yLDEuMS0zLjIsMS44Ij48L3BhdGg+DQogICAgICAgIDxwYXRoIGZpbGw9IiNmZjdiYWMiIGQ9Ik05Mi44LDM0LjJjMC4xLDAuMy0wLjMsMC44LTAuOSwxYy0wLjYsMC4yLTEuMiwwLjEtMS40LTAuMmMtMC4xLTAuMywwLjMtMC44LDAuOS0xIEM5Mi4xLDMzLjgsOTIuNywzMy45LDkyLjgsMzQuMnoiPjwvcGF0aD4NCiAgICAgICAgPHBhdGggZmlsbD0iI2ZmN2JhYyIgZD0iTTgyLjIsMzguMmMwLjEsMC4zLDAuNywwLjMsMS4zLDAuMWMwLjYtMC4yLDEtMC42LDAuOS0wLjljLTAuMS0wLjMtMC43LTAuMy0xLjMtMC4xIEM4Mi41LDM3LjUsODIsMzcuOSw4Mi4yLDM4LjJ6Ij48L3BhdGg+DQogICAgICAgIDxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik05MCwzNS43TDg5LjMsMzZsLTAuMy0wLjdjLTAuMy0wLjksMC4xLTEuOSwwLjktMi4zbDAuNy0wLjNsMC4zLDAuN0M5MS4zLDM0LjQsOTAuOSwzNS40LDkwLDM1Ljd6Ij48L3BhdGg+DQogICAgICAgIDxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik04NS4zLDM3LjRsMC43LTAuMmwtMC4yLTAuNmMtMC4zLTAuOC0xLjMtMS4yLTIuMS0wLjhMODIuOSwzNmwwLjIsMC42QzgzLjUsMzcuNCw4NC40LDM3LjcsODUuMywzNy40eiI+PC9wYXRoPg0KDQogICAgPC9nPg0KICAgIDwhLS0gW2xkaW9dIGdlbmVyYXRlZCBieSBodHRwczovL2xvYWRpbmcuaW8vIC0tPjwvc3ZnPg==';
            let html = `
                <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10001;">
                    <img src="${bgLoading}" alt="" width="100" height="100">
                    <p>等待git同步文件</p>
                    <p style="font-size: 38px">文件很大，你忍一下</p>
                </div>
            `;
            let div = document.createElement("div");
            div.style = 'display: none; position: fixed;top: 0;left: 0;width: 100%;height: 100%; z-index: 10000;background-color:rgba(255,255,255,.9)';
            div.innerHTML = html;
            document.body.appendChild(div);
            return {
                show: () => div.style.display = 'block',
                hide: () => div.style.display = 'none',
            }
        },
        // apk ipa 文件解析包信息
        // async fileParserToPackageInfo(file) {
        //     let key = '';
        //     var parser = new AppInfoParser(file)
        //     const result = await parser.parse();
        //     let env = file.name.match(/-(.*?)\./); // 目前ios不支持零宽断言 正则里的?<= 写法不行，把含有这个语法的正则去掉就行了，或者换别的写法
        //     env = env ? env[1] : 'release';
        //     let map = {};
        //     if (file.name.indexOf('.apk') > -1) {
        //         key = 'apk'
        //         map['env'] = env;
        //         map['type'] = key;
        //         map['name'] = result.application.label;
        //         map['icon'] = result.icon;
        //         map['version'] = result.versionName + '+' + result.versionCode;
        //         map['filename'] = `${map['name']}-${map['version']}-${map['env']}.apk`;
        //         map['url'] = `https://apps-dl.com/app/archives/${key}/${map['filename']}`;
        //     } else if (file.name.indexOf('.ipa') > -1) {
        //         key = 'ipa'
        //         map['env'] = env;
        //         map['type'] = key;
        //         map['name'] = result.CFBundleName;
        //         map['icon'] = result.icon;
        //         map['version'] = result.CFBundleShortVersionString + '+' + result.CFBundleVersion;
        //         map['filename'] = `${map['name']}-${map['version']}-${map['env']}.ipa`;
        //         map['plist_path'] = `app/ios-download${env === 'release' ? '' : '-' + env}.plist`;
        //         map['url'] = `itms-services://?action=download-manifest&url=https://apps-dl.com/${map['plist_path']}`;
        //     }
        //     map['size'] = (file.size / 1024 / 1024).toFixed(1) + ' MB';
        //     map['update_time'] = new Date().toLocaleString(undefined, { hour12: false });
        //     map['package_info'] = result;
        //     return map;
        // },
        // 修改ios的plist
        // async updatePlist(item) {
        //     let path = encodeURIComponent(item.plist_path);
        //     let res = await axios.request({
        //         method: 'get',
        //         url: `https://gitlab..com/api/v4/projects/3358/repository/files/${path}/raw?ref=release&private_token=`,
        //     })
        //     // 例子
        //     // var str="hello (world)";
        //     // var nstr = str.replace(/\([^\)]*\)/g,"1111");
        //     let newPlistStr = res.data.replace(/archives\/ipa\/.*?\.ipa/g, `archives/ipa/${item.filename}`);
        //     console.log('修改ios的plist:\n', newPlistStr);
        //     return newPlistStr;
        // },
        // 检测git仓库是否存在此文件
        async checkFileExists(filepath,filename) {
            let filepathDir = filepath;
            if(filepathDir.indexOf('/') > -1){
                filepathDir = filepathDir.substring(0, filepathDir.lastIndexOf('/')); // 如果是文件 则修改为父目录
            }
            if(filename == undefined){
                filename = filepath.split('/').pop();
            }
            const resCheck = await axios.request({
                method: 'get',
                url: `${gitlabHost}/api/v4/projects/3358/repository/tree`,
                params: {
                    "path": filepathDir,
                    "ref": 'release',
                    "private_token": gitlabPrivateToken,
                },
            })
            const bo = resCheck.data.some(item => item.name === filename);
            return bo;
        },
        // 更新存储库
        async updateRepo(file, progress) {
            const dir = targetDir;
            const filename = file.name;
            const suffix = filename.split('.').pop();
            const filepath = dir + suffix + '/' + filename; // const filepath = encodeURIComponent(filepath);
            
            // 读取文件
            const result = await new Promise(resolve => {
                const reader = new FileReader();
                reader.addEventListener("load", () => resolve(reader.result), false);
                reader.readAsDataURL(file);
            })
            const base64 = result.split(';base64,')[1];// convert file to base64 string
  
            // 设置gitlab的推送操作
            const actions = [];
            // -------------------------------- 检测文件是否存在 -------------------
            const isExists = await this.checkFileExists(filepath);
            actions.push({
                "action": isExists ? "update" : "create", // create, delete, move, update, chmod
                "file_path": filepath,
                "encoding": "base64",
                "content": base64,
            });
            // -------------------------------- 检测文件是否存在 -------------------end
        
            // 开始请求推送
            const res = await axios.request({
                // method: 'put',
                // url: 'https://gitlab..com/api/v4/projects/2930/repository/files/dist%2Fapp-download-assets%2Flatest_version.json?private_token=',
                // url: `https://gitlab..com/api/v4/projects/2930/repository/files/${file_path}?private_token=`,
                method: 'post',
                headers: { "PRIVATE-TOKEN": gitlabPrivateToken },
                url: `${gitlabHost}/api/v4/projects/3358/repository/commits`,
                data: {
                    "branch": "release",
                    "commit_message": `📦 ${filename} 来源:${location.href}`,
                    "actions": actions,
                },
                onUploadProgress(p) {
                    console.log(100 * (p.loaded / p.total).toFixed(2))
                    progress(true, p.loaded, p.total);
                },
                onDownloadProgress(p) {
                    console.log(100 * (p.loaded / p.total))
                }
            })
            return filepath;
        },
        async getGitTree() {
            let res = await axios.request({
                method: 'get',
                url: `${gitlabHost}/api/v4/projects/3358/repository/tree`,
                params: {
                    "path": targetDir,
                    "ref": 'release',
                    "private_token": gitlabPrivateToken,
                },
            });
            
            for(let item of res.data){
                if(item.type === 'tree'){
                    let res2 = await axios.request({
                        method: 'get',
                        url: `${gitlabHost}/api/v4/projects/3358/repository/tree`,
                        params: {
                            "path": item.path,
                            "ref": 'release',
                            "private_token": gitlabPrivateToken,
                        },
                    });
                    let last = res2.data.pop();//最后一个
                    // item.latest = last;
                    item.url = host + '/' +  last.path;
                }else{
                    item.url = host + '/' + item.path;
                }
            }
            this.gitTreeData = res.data;
        },
        // 获取配置json
        // getPackageInfo() {
        //     return new Promise((resolve, reject) => {
        //         const url = "./package_info.json?v=" + Date.now()/*json文件url*/
        //         const request = new XMLHttpRequest();
        //         request.open("get", url);/*设置请求方法与路径*/
        //         request.send(null);/*不发送数据到服务器*/
        //         request.onload = () => {/*XHR对象获取到返回信息后执行*/
        //             if (request.status === 200) {/*返回状态为200，即为数据获取成功*/
        //                 const json = JSON.parse(request.responseText);
        //                 this.dataJson = json;
        //                 this.dataJsonList = json.list;
        //                 console.log(json);
        //                 resolve();
        //             }
        //         }
        //     })
        // },
        // 检测此文件是否可以下载
        checkFileDownload(filepath) {
            return new Promise((resolve, reject) => {
                try{
                    const url = host +'/'+ filepath;
                    const xhr = new XMLHttpRequest();
                    xhr.open("HEAD", url);/*设置请求方法与路径*/
                    xhr.send(null);/*不发送数据到服务器*/
                    xhr.onload = () => {/*XHR对象获取到返回信息后执行*/
                        if(xhr.status === 200){/*返回状态为200，即为数据获取成功*/
                            // xhr.abort();//避免200后 下载数据 xhr.open("HEAD", url)
                            resolve(true);
                        }else{
                            resolve(false);//xhr.status !== 404
                        }
                    }
                }catch(e){
                    resolve(false);//跨域 好像拦截不了
                }
            });
        },
    },
    created: function () {
  
    },
    mounted: function () {
        this.getGitTree();
        // this.getPackageInfo();
  
        // 初始化上传组件
        FilePond.registerPlugin(
            // FilePondPluginImagePreview,
            // FilePondPluginImageExifOrientation,
            FilePondPluginFileValidateSize,
            // FilePondPluginImageEdit
        );
        FilePond.create(
          shadowRoot.querySelector('input[type="file"]'),
            {
                labelIdle: '<span style="color: red;">只能开发上传哦！建议一个一个上传</span><br/> Drag & Drop your files or <span class="filepond--label-action"> Browse </span>',
                //
                // TODO 实现阻塞 一个一个上传 避免状态无法一起同步 等复杂逻辑
                //
  
                // server: '/upload',
                server: {
                    process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
                        /* store file somewhere and call `load` when done */
                        this.updateRepo(file, progress).then((filepath) => {
                            load();
                            let loading = this.loadingUtil();
                            loading.show();
                            let timer;
                            let timerFunc = () => {
                                timer = setTimeout(() => {
                                    this.checkFileDownload(filepath).then(res => {
                                        if (res) {
                                            clearTimeout(timer);
                                            loading.hide();
                                            this.getGitTree();
                                        } else {
                                            timerFunc();
                                        }
                                        console.count(`timer count:`); //计数
                                    });
                                }, 1000)
                            }
                            timerFunc();
                        })
                    },
                },
                // instantUpload: false, // 自动上传
            }
        );
  
        // 生成二维码
        // new QRCode(document.getElementById('qrcodeImage'), {
        //     text: location.href, // 需要转换为二维码的内容
        //     width: 100,
        //     height: 100,
        //     colorDark: '#000000',
        //     colorLight: '#ffffff',
        //     correctLevel: QRCode.CorrectLevel.H
        // });
    }
  })
}
