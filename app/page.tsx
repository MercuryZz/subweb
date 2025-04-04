'use client'

import {
  clientList,
  configList,
  formLabelMap,
  formSchema,
  FormValues,
} from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Blend,
  Cog,
  Copy,
  ExternalLink,
  Github,
  RailSymbol,
  ArrowBigRightDash,
} from 'lucide-react'
import Link from 'next/link'
import { encode } from 'punycode'
import { useState } from 'react'
import { Resolver, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function Home() {
  const [subription, setSubscription] = useState<string>('')
  const [shortLink, setShortLink] = useState<string>('')
  const [settingShortLinkAddress, setSettingShortLinkAddress] =
    useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
    defaultValues: {
      url: '',
      target: 'surge&ver=4',
      serverProtocol: 'https://',
      serverDomain: '127.0.0.1',
      serverPort: 25500,
      config: '',
      customConfig: '',
      include: '',
      exclude: '',
      filename: '',
      interval: 43200,
      emoji: true,
      tfo: true,
      udp: true,
      sort: false,
      fdn: true,
      scv: false,
      expand: true,
      list: false,
    },
  })
  const config = watch('config')
  const onSubmit = (data: FormValues) => {
    const url = data.url.replace(/(\n|\r|\n\r)/g, '|')
    let result =
      data.serverProtocol +
      data.serverDomain +
      ':' +
      data.serverPort +
      '/sub?target=' +
      data.target +
      '&url=' +
      encodeURIComponent(url) +
      '&interval=' +
      data.interval

    if (data.config || data.config !== 'custom')
      result += '&config=' + encodeURIComponent(data.config)
    else if (data.config === 'custom' && data.customConfig)
      result += '&config=' + encodeURIComponent(data.customConfig)
    if (data.include) result += '&include=' + encodeURIComponent(data.include)
    if (data.exclude) result += '&exclude=' + encodeURIComponent(data.exclude)
    if (data.filename)
      result += '&filename=' + encodeURIComponent(data.filename)
    if (data.emoji) result += '&emoji=true'
    if (data.tfo) result += '&tfo=true'
    if (data.udp) result += '&udp=true'
    if (data.sort) result += '&sort=true'
    if (data.fdn) result += '&fdn=true'
    if (data.scv) result += '&scv=true'
    if (data.expand) result += '&expand=true'
    if (data.list) result += '&list=true'
    setSubscription(result)
    navigator.clipboard.writeText(result)
    toast.success('订阅链接已复制到剪贴板')
  }
  const onError = (errors: any) => {
    const fieldNames = Object.keys(errors)
    if (fieldNames.length > 0) {
      const error = errors[fieldNames[0]]
      if (error?.message) {
        toast.error(error.message)
      }
    }
  }
  return (
    <main className='container mx-auto bg-base-100 border border-base-300 rounded-md px-6 py-3 flex flex-col'>
      <header className='flex justify-between'>
        <Link
          href='https://github.com/MercuryZz/subweb'
          className='flex items-center gap-1.5'
        >
          <h1>SUB WEB</h1>
          <Github size={16} />
        </Link>
        <div className='flex items-baseline gap-1.5'>
          <div className='status status-success animate-bounce'></div>
          <span className='text-accent-content'>v0.0.1</span>
        </div>
      </header>
      <div className='border-b border-b-base-300 -mx-6 my-3'></div>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className='w-full flex flex-col gap-3'
      >
        <fieldset className='fieldset'>
          <legend className='fieldset-legend'>{formLabelMap['url']}</legend>
          <textarea
            className='textarea h-24 w-full'
            placeholder={
              '多订阅链接或节点请确保每行一条\n支持手动使用 | 分割多链接或节点'
            }
            {...register('url')}
          ></textarea>
        </fieldset>
        <div className='flex flex-col md:flex-row gap-3'>
          <fieldset className='fieldset'>
            <legend className='fieldset-legend'>
              {formLabelMap['target']}
            </legend>
            <select className='select w-fit' {...register('target')}>
              {clientList.map((client) => (
                <option key={client.label} value={client.value}>
                  {client.label}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset className='fieldset flex-1'>
            <legend className='fieldset-legend'>
              {formLabelMap['server']}
              <Link
                href='https://github.com/tindy2013/subconverter/'
                className='link flex items-center gap-px'
              >
                subconverter
                <ExternalLink size={12} />
              </Link>
            </legend>
            <div className='join join-horizontal items-center'>
              <select
                className='select w-fit join-item'
                {...register('serverProtocol')}
              >
                <option>https://</option>
                <option>http://</option>
              </select>
              <input
                type='text'
                placeholder='address'
                className='input flex-1 join-item'
                {...register('serverDomain')}
              />
              <span className='z-[2] w-0 translate-x-2 font-bold text-base-content/60'>
                :
              </span>
              <input
                type='number'
                placeholder='port'
                className='input w-20 join-item pl-5'
                {...register('serverPort')}
              />
            </div>
          </fieldset>
        </div>
        <fieldset className='fieldset'>
          <legend className='fieldset-legend'>{formLabelMap['config']}</legend>
          <div className='flex gap-3'>
            <select className='select w-fit' {...register('config')}>
              {configList.map((config) => (
                <option key={config.label} value={config.value}>
                  {config.label}
                </option>
              ))}
            </select>
            <input
              type='text'
              className={`input flex-1 transition-all duration-200 ${
                config === 'custom'
                  ? 'opacity-100 w-full'
                  : 'opacity-0 w-0 p-0 border-0'
              } ${config === 'custom' ? '!w-full' : 'w-0'}`}
              placeholder='自定义配置链接'
              {...register('customConfig')}
            />
          </div>
        </fieldset>
        <div className='divider text-xs my-0'>高级选项 「可选」</div>
        <div className='flex gap-3'>
          <fieldset className='fieldset flex-1'>
            <legend className='fieldset-legend'>
              {formLabelMap['include']}
            </legend>
            <input
              type='text'
              className='input w-full'
              placeholder='如: (香港|台湾)'
              {...register('include')}
            />
          </fieldset>
          <fieldset className='fieldset flex-1'>
            <legend className='fieldset-legend'>
              {formLabelMap['exclude']}
            </legend>
            <input
              type='text'
              className='input w-full'
              placeholder='如: (流量|官网)'
              {...register('exclude')}
            />
          </fieldset>
        </div>
        <div className='flex gap-3'>
          <fieldset className='fieldset flex-1'>
            <legend className='fieldset-legend'>
              {formLabelMap['filename']}
            </legend>
            <input
              type='text'
              className='input w-full'
              {...register('filename')}
            />
          </fieldset>
          <fieldset className='fieldset flex-1'>
            <legend className='fieldset-legend'>
              {formLabelMap['interval']}
            </legend>
            <input
              type='number'
              className='input w-full'
              {...register('interval')}
            />
          </fieldset>
        </div>
        <fieldset className='fieldset flex flex-wrap gap-x-4 gap-y-2'>
          <label className='fieldset-label'>
            <input
              type='checkbox'
              className='checkbox'
              {...register('emoji')}
            />
            {formLabelMap['emoji']}
          </label>
          <label className='fieldset-label'>
            <input type='checkbox' className='checkbox' {...register('tfo')} />
            {formLabelMap['tfo']}
          </label>
          <label className='fieldset-label'>
            <input type='checkbox' className='checkbox' {...register('udp')} />
            {formLabelMap['udp']}
          </label>
          <label className='fieldset-label'>
            <input type='checkbox' className='checkbox' {...register('sort')} />
            {formLabelMap['sort']}
          </label>
          <label className='fieldset-label'>
            <input type='checkbox' className='checkbox' {...register('fdn')} />
            {formLabelMap['fdn']}
          </label>
          <label className='fieldset-label'>
            <input type='checkbox' className='checkbox' {...register('scv')} />
            {formLabelMap['scv']}
          </label>
          <label className='fieldset-label'>
            <input
              type='checkbox'
              className='checkbox'
              {...register('expand')}
            />
            {formLabelMap['expand']}
          </label>
          <label className='fieldset-label'>
            <input type='checkbox' className='checkbox' {...register('list')} />
            {formLabelMap['list']}
          </label>
        </fieldset>
        <div className='divider text-xs text-base-content/60'>
          <Blend size={36} />
        </div>
        <div className='flex gap-3'>
          <div className='join flex-1'>
            <input
              type='text'
              className='w-full input join-item'
              value={subription}
              disabled
            />
            <button
              type='button'
              className='btn join-item'
              onClick={() => {
                navigator.clipboard.writeText(subription)
                toast.success('订阅链接已复制到剪贴板')
              }}
              disabled={!subription}
            >
              <Copy size={16} />
            </button>
          </div>
          <button type='submit' className='btn'>
            生成订阅链接
          </button>
        </div>
        {/* <div className='flex gap-3'>
          <div className='join flex-1'>
            <input
              type='text'
              className='w-full input join-item'
              value={subription}
              disabled
            />
            <button
              type='button'
              className='btn join-item'
              onClick={() => {
                navigator.clipboard.writeText(subription)
                toast.success('短链已复制到剪贴板')
              }}
              disabled={!subription}
            >
              <Copy size={16} />
            </button>
          </div>
          <button type='button' className='btn'>
            生成短链
          </button>
          <input
            type='text'
            className={`input ${settingShortLinkAddress ? 'flex' : 'hidden'}`}
          />
          <div className='tooltip' data-tip='设置短链地址'>
            <button
              type='button'
              className='btn'
              onClick={() =>
                setSettingShortLinkAddress(!settingShortLinkAddress)
              }
            >
              {settingShortLinkAddress ? (
                <ArrowBigRightDash size={16} />
              ) : (
                <Cog size={16} />
              )}
            </button>
          </div>
        </div> */}
      </form>
    </main>
  )
}
