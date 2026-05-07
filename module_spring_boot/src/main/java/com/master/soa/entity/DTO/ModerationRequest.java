package com.master.soa.entity.DTO;

public class ModerationRequest {
    private Long annonceId;
    // constructeurs, getters, setters
    public ModerationRequest() {}
    public ModerationRequest(Long annonceId) { this.annonceId = annonceId; }
    public Long getAnnonceId() { return annonceId; }
    public void setAnnonceId(Long annonceId) { this.annonceId = annonceId; }
}
