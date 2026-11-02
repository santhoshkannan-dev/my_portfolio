import { describe, it, expect } from "vitest";
import { vercelProjects } from "../data/vercelProjects";

describe("Portfolio Project Catalog & Deployments", () => {
  it("should have all 21 Vercel deployments configured with valid URLs and titles", () => {
    expect(vercelProjects.length).toBe(21);
    vercelProjects.forEach((project) => {
      expect(project.text).toBeDefined();
      expect(project.text!.length).toBeGreaterThan(0);
      expect(project.url).toMatch(/^https:\/\/[a-z0-9.-]+\.vercel\.app/i);
      expect(project.image).toBeDefined();
    });
  });

  it("should include key flagship projects in the Vercel catalog", () => {
    const names = vercelProjects.map((p) => p.text);
    expect(names).toContain("Cineverse 3D");
    expect(names).toContain("VLink Inventory");
    expect(names).toContain("NeXGeaR");
    expect(names).toContain("Subscription Manager");
    expect(names).toContain("Solar System 3D");
  });
});
