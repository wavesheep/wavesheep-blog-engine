import Vue from 'vue'
import Vssue from 'vssue'
import GithubV3 from '@vssue/api-github-v3'
import 'vssue/dist/vssue.css'
import BLOGCONFIG from '@/static/blog.config'

Vue.use(Vssue, {
  api: GithubV3,
  owner: BLOGCONFIG.vssue.owner,
  repo: BLOGCONFIG.vssue.repo,
  clientId: BLOGCONFIG?.vssue?.clientId || process.env.vssue_clientId,
  clientSecret: BLOGCONFIG?.vssue?.clientSecret || process.env.vssue_clientSecret,
})