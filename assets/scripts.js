// Initialize Alloy
!function (n, o) {
    o.forEach(function (o) {
        n[o] || ((n.__alloyNS = n.__alloyNS || []).push(o), n[o] = function () {
            var u = arguments; return new Promise(function (i, l) { n[o].q.push([i, l, u]) })
        }, n[o].q = [])
    })
}(window, ["alloy"]);

// Configure Alloy
alloy("configure", {
    datastreamId: "27d43572-4f83-479d-af85-6c8a1176b93e",
    orgId: "E15EA5EF56F25C847F000101@AdobeOrg",
    context: ["web", "device", "environment"],
    debugEnabled: true,
    defaultConsent: "pending",
    downloadLinkQualifier: "\\.(exe|zip|wav|mp3|mov|mpg|avi|wmv|pdf|doc|docx|xls|xlsx|ppt|pptx)$",
    idMigrationEnabled: false,
    prehidingStyle: "#personalization_container { opacity: 0 !important }",
    targetMigrationEnabled: true,
    thirdPartyCookiesEnabled: false
});

// Fetch and apply propositions
async function fetchAndApplyPropositions() {
    try {
        const response = await alloy("sendEvent", {
            renderDecisions: true,
            decisionScopes: ["__view__"]
        });

        const propositions = response.decisions || [];

        propositions.forEach((prop) => {
            prop.items.forEach((item) => {
                const selector = item.data && item.data.selector;
                const content = item.data && item.data.content;

                if (selector && content) {
                    const element = document.querySelector(selector);
                    if (element) {
                        element.innerHTML = content;
                    }
                }
            });
        });

        console.log("Propositions applied successfully.");
    } catch (error) {
        console.error("Error fetching or applying propositions:", error);
    }
}

// Call fetchAndApplyPropositions on page load
fetchAndApplyPropositions();
