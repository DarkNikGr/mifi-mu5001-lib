class Forms {

    constructor(session) {
        this.session = session;
    }

    // ps_no_service_restart_flag = "0" || "1"
    ps_no_service_restart(ps_no_service_restart_flag) {
        return this.session.post({
            isTest: false,
            goformId: "PS_NO_SERVICE_RESTART_SET",
            ps_no_service_restart_flag
        })
    }

    nr5g_band(nr5g_band_mask) {
        return this.session.post({
            isTest: false,
            goformId: "WAN_PERFORM_NR5G_BAND_LOCK",
            nr5g_band_mask
        })
    }

    cell_lock(lte_pci_lock, lte_earfcn_lock) {
        return this.session.post({
            isTest: false,
            goformId: "LTE_LOCK_CELL_SET",
            lte_pci_lock,
            lte_earfcn_lock
        })
    }
}

module.exports = Forms;