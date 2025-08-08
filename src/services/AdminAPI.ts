// services/AdminAPI.ts
import { BaseAPI, type ApiResponse } from './BaseAPI';

export interface InvitationData {
  id: string;
  email: string;
  role: string;
  sentAt: string;
  status: 'pending' | 'expired' | 'registered' | 'canceled';
  expiresAt: string;
}

export interface SendInvitationRequest {
  email: string;
}

export interface ValidateTokenRequest {
  email: string;
  token: string;
}

export interface ValidateTokenResponse {
  valid: boolean;
}

export interface SendInvitationResponse {
  success: boolean;
}

export class AdminAPI extends BaseAPI {
  async getInvitations(): Promise<ApiResponse<InvitationData[]>> {
    return this.get<InvitationData[]>('/api/invitations');
  }

  async sendInvitation(
    invitation: SendInvitationRequest
  ): Promise<ApiResponse<SendInvitationResponse>> {
    return this.post<SendInvitationResponse>(
      '/api/send-mail-invitation',
      invitation
    );
  }

  async validateInvitationToken(
    validation: ValidateTokenRequest
  ): Promise<ApiResponse<ValidateTokenResponse>> {
    return this.post<ValidateTokenResponse>(
      '/api/validate-invitation-token',
      validation
    );
  }

  async updateInvitation(
    id: string,
    updates: Partial<InvitationData>
  ): Promise<ApiResponse<InvitationData>> {
    return this.put<InvitationData>(`/api/invitation/${id}`, updates);
  }

  async deleteInvitation(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/api/invitations/${id}`);
  }
}
