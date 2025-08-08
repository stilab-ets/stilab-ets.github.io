import { ref, computed } from 'vue';
import { adminAPI } from '@/services/ApiFactory';
import type {
  SendInvitationRequest,
  ValidateTokenRequest,
} from '@/services/AdminAPI';

export interface Invitation {
  id: string;
  email: string;
  role: string;
  sentAt: string;
  status: 'pending' | 'expired' | 'registered' | 'canceled';
  expiresAt: string;
}

export function useInvitations() {
  const invitations = ref<Invitation[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const pendingInvitations = computed(() =>
    invitations.value.filter((inv) => inv.status === 'pending')
  );

  const expiredInvitations = computed(() =>
    invitations.value.filter((inv) => inv.status === 'expired')
  );

  const registeredInvitations = computed(() =>
    invitations.value.filter((inv) => inv.status === 'registered')
  );

  const fetchInvitations = async (): Promise<void> => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await adminAPI.getInvitations();
      invitations.value = response.data;
    } catch (err) {
      error.value = 'Failed to fetch invitations';
      console.error('Error fetching invitations:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const sendInvitation = async (
    invitation: SendInvitationRequest
  ): Promise<boolean> => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await adminAPI.sendInvitation(invitation);
      if (response.data.success) {
        await fetchInvitations(); // Refresh the list
        return true;
      }
      return false;
    } catch (err) {
      error.value = 'Failed to send invitation';
      console.error('Error sending invitation:', err);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const validateInvitationToken = async (
    validation: ValidateTokenRequest
  ): Promise<boolean> => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await adminAPI.validateInvitationToken(validation);
      return response.data.valid;
    } catch (err) {
      error.value = 'Failed to validate invitation token';
      console.error('Error validating invitation token:', err);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const updateInvitation = async (
    id: string,
    updates: Partial<Invitation>
  ): Promise<boolean> => {
    isLoading.value = true;
    error.value = null;

    try {
      await adminAPI.updateInvitation(id, updates);
      const index = invitations.value.findIndex((inv) => inv.id === id);
      if (index !== -1) {
        invitations.value[index] = { ...invitations.value[index], ...updates };
      }
      return true;
    } catch (err) {
      error.value = 'Failed to update invitation';
      console.error('Error updating invitation:', err);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteInvitation = async (id: string): Promise<boolean> => {
    isLoading.value = true;
    error.value = null;

    try {
      await adminAPI.deleteInvitation(id);
      invitations.value = invitations.value.filter((inv) => inv.id !== id);
      return true;
    } catch (err) {
      error.value = 'Failed to delete invitation';
      console.error('Error deleting invitation:', err);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const cancelInvitation = async (id: string): Promise<boolean> => {
    return await updateInvitation(id, { status: 'canceled' });
  };

  return {
    invitations,
    pendingInvitations,
    expiredInvitations,
    registeredInvitations,
    isLoading,
    error,
    fetchInvitations,
    sendInvitation,
    validateInvitationToken,
    updateInvitation,
    deleteInvitation,
    cancelInvitation,
  };
}
