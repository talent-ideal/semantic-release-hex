import { readProjectVersion } from "./read-project-version.js";

describe("readProjectVersion", () => {
  it("should return version and subparts when match", () => {
    const simple = readProjectVersion('version: "0.0.4"');
    expect(simple.version).toBe("0.0.4");
    expect(simple.major).toBe("0");
    expect(simple.minor).toBe("0");
    expect(simple.patch).toBe("4");
    expect(simple.prerelease).toBeUndefined();
    expect(simple.metadata).toBeUndefined();

    const prerelease = readProjectVersion('version: "1.0.0-alpha"');
    expect(prerelease.version).toBe("1.0.0-alpha");
    expect(prerelease.major).toBe("1");
    expect(prerelease.minor).toBe("0");
    expect(prerelease.patch).toBe("0");
    expect(prerelease.prerelease).toBe("alpha");
    expect(prerelease.metadata).toBeUndefined();

    const metadata = readProjectVersion('@version "1.1.2+meta"');
    expect(metadata.version).toBe("1.1.2+meta");
    expect(metadata.major).toBe("1");
    expect(metadata.minor).toBe("1");
    expect(metadata.patch).toBe("2");
    expect(metadata.prerelease).toBeUndefined();
    expect(metadata.metadata).toBe("meta");

    const preleaseAndMetadata = readProjectVersion(
      '@version "1.1.2-prerelease+meta"',
    );
    expect(preleaseAndMetadata.version).toBe("1.1.2-prerelease+meta");
    expect(preleaseAndMetadata.major).toBe("1");
    expect(preleaseAndMetadata.minor).toBe("1");
    expect(preleaseAndMetadata.patch).toBe("2");
    expect(preleaseAndMetadata.prerelease).toBe("prerelease");
    expect(preleaseAndMetadata.metadata).toBe("meta");
  });

  it("should return undefined version and subparts when no match", () => {
    const match = readProjectVersion("");
    expect(match.version).toBeUndefined();
    expect(match.major).toBeUndefined();
    expect(match.minor).toBeUndefined();
    expect(match.patch).toBeUndefined();
    expect(match.prerelease).toBeUndefined();
    expect(match.metadata).toBeUndefined();
  });
});
