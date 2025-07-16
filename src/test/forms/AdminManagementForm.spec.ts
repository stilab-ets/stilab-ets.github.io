import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AdminManagement from '@/components/forms/AdminManagementForm.vue'
import { ref, nextTick } from 'vue'

vi.mock('@/composables/useLanguage', () => ({
  useLanguage: () => ({
    t: ref({
      forms: {
        adminManagement: {
          title: 'Admin Management',
          subtitle: 'Manage lab settings, users, and content.',
          success: {
            settingsUpdated: 'Settings updated successfully!',
            userDeleted: 'User deleted successfully.',
            contentApproved: 'Content approved successfully.'
          },
          errors: {
            updateFailed: 'Failed to update settings.',
            deleteFailed: 'Failed to delete user.'
          },
          validation: {
            labNameRequired: 'Lab name is required.',
            contactEmailInvalid: 'Invalid email address.'
          },
          form: {
            save: 'Save',
            saving: 'Saving...',
            cancel: 'Cancel'
          },
          sections: {
            users: 'Users',
            system: 'System Settings',
            content: 'Content'
          },
          userManagement: {
            searchPlaceholder: 'Search users...',
            allRoles: 'All Roles',
            allStatuses: 'All Statuses',
            editUser: 'Edit',
            deleteUser: 'Delete',
            confirmDelete: 'Confirm Delete',
            deleteConfirmMessage: 'Are you sure you want to delete this user?'
          },
          systemSettings: {
            labName: 'Lab Name',
            labDescription: 'Lab Description',
            contactEmail: 'Contact Email',
            contactPhone: 'Contact Phone',
            address: 'Address',
            maintenanceMode: 'Maintenance Mode',
            enableRegistration: 'Enable Registration',
            requireApproval: 'Require Approval'
          },
          contentManagement: {
            pendingPublications: 'Pending Publications',
            pendingEvents: 'Pending Events',
            approve: 'Approve',
            reject: 'Reject'
          }
        }
      }
    })
  })
}))

vi.mock('@/components/ui/Card.vue', () => ({
  default: { template: '<div><slot /></div>' }
}))

vi.mock('@/components/ui/Button.vue', () => ({
  default: { template: '<button><slot /></button>' }
}))

describe('AdminManagement.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(AdminManagement)
  })

  it('renders default section title and subtitle', () => {
    expect(wrapper.text()).toContain('Admin Management')
    expect(wrapper.text()).toContain('Manage lab settings, users, and content.')
  })

  it('shows filtered users when search query is entered', async () => {
    (wrapper.vm as any).searchQuery = 'Alex'
    await nextTick()

    const userRows = wrapper.findAll('tbody tr')
    expect(userRows.length).toBe(1)
    expect(userRows[0].text()).toContain('Alex Rodriguez')
  })

  it('emits deleteUser and removes user from list', async () => {
    (wrapper.vm as any).confirmDeleteUser((wrapper.vm as any).mockUsers[0])
    await nextTick()

    await (wrapper.vm as any).deleteUser()
    await nextTick()

    expect(wrapper.emitted('deleteUser')).toBeTruthy()
    expect(wrapper.text()).toContain('User deleted successfully.')
    expect((wrapper.vm as any).mockUsers.find((u: { id: string }) => u.id === '1')).toBeUndefined()
  })

  it('emits approveContent for publication', async () => {
    (wrapper.vm as any).approveContent('pub1', 'publication')
    await nextTick()

    expect(wrapper.emitted('approveContent')).toBeTruthy()
    expect((wrapper.vm as any).mockPendingPublications.find((p: { id: string }) => p.id === 'pub1')).toBeUndefined()
  })

  it('emits rejectContent for event', async () => {
    (wrapper.vm as any).rejectContent('event1', 'event')
    await nextTick()

    expect(wrapper.emitted('rejectContent')).toBeTruthy()
    expect((wrapper.vm as any).mockPendingEvents.find((e: { id: string }) => e.id === 'event1')).toBeUndefined()
  })
})
