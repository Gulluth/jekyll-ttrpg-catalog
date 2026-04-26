import './app.css'
import { mount } from 'svelte'
import Preview from './Preview.svelte'

mount(Preview, { target: document.getElementById('preview-root')! })
