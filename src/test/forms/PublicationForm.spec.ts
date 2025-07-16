import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PublicationForm from '@/components/forms/PublicationForm.vue'
import { nextTick } from 'vue'

vi.mock('@/composables/useLanguage', () => ({
  useLanguage: () => ({
    t: {
      value: {
        forms: {
          publication: {
            titleCreate: 'Create Publication',
            titleEdit: 'Edit Publication',
            subtitle: 'Fill in the details below.',
            form: {
              entryType: 'Entry Type',
              selectEntryType: 'Select type',
              title: 'Title',
              titlePlaceholder: 'Publication Title',
              authors: 'Authors',
              authorsPlaceholder: 'Last, First and Last, First',
              authorsHelp: 'Separate authors using "and"',
              year: 'Year',
              citekey: 'Citekey',
              citekeyPlaceholder: 'Auto-generated if empty',
              citekeyHelp: 'Optional unique identifier',
              journal: 'Journal',
              journalPlaceholder: 'Journal of AI Research',
              booktitle: 'Book Title',
              booktitlePlaceholder: 'Conference Name',
              publisher: 'Publisher',
              publisherPlaceholder: 'Springer, IEEE...',
              volume: 'Volume',
              volumePlaceholder: '42',
              number: 'Number',
              numberPlaceholder: '7',
              pages: 'Pages',
              pagesPlaceholder: '123-456',
              url: 'URL',
              urlPlaceholder: 'https://...',
              cancel: 'Cancel',
              create: 'Create',
              update: 'Update',
              submitting: 'Submitting...'
            },
            bibtexImport: {
              title: 'Import from BibTeX',
              description: 'Paste BibTeX to populate the form.',
              placeholder: 'Paste your BibTeX entry here...',
              parse: 'Parse',
              clear: 'Clear'
            },
            preview: {
              title: 'Preview BibTeX'
            },
            validation: {
              entryTypeRequired: 'Entry type is required.',
              titleRequired: 'Title is required.',
              authorRequired: 'Author is required.',
              yearInvalid: 'Invalid year.'
            },
            errors: {
              submitFailed: 'Failed to submit.'
            },
            entryTypes: {
              article: 'Article',
              book: 'Book',
              booklet: 'Booklet',
              conference: 'Conference',
              inbook: 'In Book',
              incollection: 'In Collection',
              inproceedings: 'In Proceedings',
              manual: 'Manual',
              mastersthesis: 'Master Thesis',
              misc: 'Misc',
              phdthesis: 'PhD Thesis',
              proceedings: 'Proceedings',
              techreport: 'Tech Report',
              unpublished: 'Unpublished',
              online: 'Online',
              presentation: 'Presentation'
            }
          }
        }
      }
    }
  })
}))

describe('PublicationForm.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(PublicationForm)
  })

  it('renders title and subtitle', () => {
    expect(wrapper.text()).toContain('Create Publication')
    expect(wrapper.text()).toContain('Fill in the details below.')
  })

  it('shows validation errors on empty required fields', async () => {
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    expect(wrapper.text()).toContain('Entry type is required.')
    expect(wrapper.text()).toContain('Title is required.')
    expect(wrapper.text()).toContain('Author is required.')
  })

  it('validates invalid year', async () => {
    await wrapper.find('#entrytype').setValue('article')
    await wrapper.find('#title').setValue('A Great Paper')
    await wrapper.find('#author').setValue('Smith, John')
    await wrapper.find('#year').setValue('1800')

    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    expect(wrapper.text()).toContain('Invalid year.')
  })
})
